import { NextResponse } from "next/server";
import { striverQuestions, type StriverQuestion } from "@/data/striverQuestions";
import { getGeminiModel } from "@/lib/gemini";

export const runtime = "nodejs";

type InterviewStage =
  | "approach"
  | "timeComplexity"
  | "spaceComplexity"
  | "optimization"
  | "complete"
  | "solution";

type InterviewState = {
  stage: InterviewStage;
  hintsUsed: number;
};

type ChatRequestBody = {
  message: string;
  mode: "mockInterview" | "normalChat";
  selectedTopic?: string;
  currentQuestion?: StriverQuestion | null;
  interviewState?: InterviewState | null;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};

const DEFAULT_INTERVIEW_STATE: InterviewState = {
  stage: "approach",
  hintsUsed: 0
};

function getQuestionsByTopic(selectedTopic?: string) {
  if (!selectedTopic) {
    return striverQuestions;
  }

  return striverQuestions.filter((question) => question.topic === selectedTopic);
}

function pickRandomQuestion(selectedTopic?: string) {
  const questions = getQuestionsByTopic(selectedTopic);
  const pool = questions.length > 0 ? questions : striverQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildMockInterviewPrompt(
  question: StriverQuestion,
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  interviewState: InterviewState,
  intent: "start" | "hint" | "solution" | "continue"
) {
  const conversation = history
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.content}`)
    .join("\n");

  const stageInstructions: Record<InterviewStage, string> = {
    approach:
      "The candidate is still explaining the high-level approach. Evaluate the approach and either ask one focused clarifying question or move to time complexity if the approach is sufficient.",
    timeComplexity:
      "The candidate has already explained the approach. Ask specifically about time complexity and react to their answer.",
    spaceComplexity:
      "The candidate has already discussed time complexity. Ask specifically about space complexity and react to their answer.",
    optimization:
      "The candidate has already discussed time and space complexity. Ask about possible optimizations or edge cases and react to their answer.",
    complete:
      "The interview round is almost complete. Give concise feedback and mention they can ask for the full solution if they want it.",
    solution:
      "The candidate explicitly asked for the solution. You may now explain the full solution clearly with intuition, algorithm, and complexity."
  };

  return `
You are a FAANG-level DSA interviewer.

Question Title: ${question.title}
Topic: ${question.topic}
Difficulty: ${question.difficulty}
Problem:
${question.description}

Question Link:
${question.link}

Rules:
- Ask the user how they would approach the problem.
- Do NOT give the solution immediately.
- Give hints gradually if they struggle.
- Ask follow-up questions.
- Behave like a real interviewer.
- Base your feedback on the user's actual response.
- Keep the reply concise and interview-focused.
- Do not skip directly to the solution unless the user explicitly asks for it.

Conversation so far:
${conversation || "No previous conversation."}

Latest user message:
${message}

Interview stage: ${interviewState.stage}
Hints already used: ${interviewState.hintsUsed}
Intent: ${intent}

Stage guidance:
${stageInstructions[interviewState.stage]}

Specific behavior:
- If intent is "start", clearly present the problem and ask for the candidate's approach.
- If intent is "hint", do not give the full solution. Give only the next small hint based on hint count.
- If stage is "approach" and the candidate gave a meaningful approach, ask about time complexity next.
- If stage is "timeComplexity", ask about space complexity after reacting to the answer.
- If stage is "spaceComplexity", ask about optimizations after reacting to the answer.
- If stage is "optimization", give final feedback and mention they can ask for the full solution.
- If intent is "solution", provide the full solution now.
`;
}

function buildNormalChatPrompt(message: string, selectedTopic?: string) {
  return `
You are DSA Interview Coach, a chatbot trained around Striver SDE Sheet style interview preparation.

Topic preference: ${selectedTopic || "General DSA"}

Rules:
- Answer as a purpose-built DSA interview coach.
- Keep the response focused on problem solving, hints, patterns, and interview readiness.
- If asked for solutions, prefer giving guidance or structured hints first.

User message:
${message}
`;
}

function isHintRequest(message: string) {
  return /\b(hint|stuck|help|clue|nudge|struggling|dont know|don't know)\b/i.test(message);
}

function isSolutionRequest(message: string) {
  return /\b(solution|answer|solve it|full solution|show code|give code|tell me the solution)\b/i.test(
    message
  );
}

function getNextStage(stage: InterviewStage, intent: "hint" | "solution" | "continue") {
  if (intent === "solution") {
    return "solution" as const;
  }

  if (intent === "hint") {
    return stage;
  }

  if (stage === "approach") {
    return "timeComplexity" as const;
  }

  if (stage === "timeComplexity") {
    return "spaceComplexity" as const;
  }

  if (stage === "spaceComplexity") {
    return "optimization" as const;
  }

  if (stage === "optimization") {
    return "complete" as const;
  }

  return stage;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const {
      message,
      mode,
      selectedTopic,
      currentQuestion,
      interviewState,
      history = []
    } = body;

    if (!message || !mode) {
      return NextResponse.json(
        { error: "Message and mode are required." },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    const selectedQuestion =
      mode === "mockInterview"
        ? currentQuestion ?? pickRandomQuestion(selectedTopic)
        : null;
    const activeInterviewState = interviewState ?? DEFAULT_INTERVIEW_STATE;
    const intent =
      mode === "mockInterview" && !currentQuestion
        ? "start"
        : isSolutionRequest(message)
          ? "solution"
          : isHintRequest(message)
            ? "hint"
            : "continue";

    const prompt =
      mode === "mockInterview" && selectedQuestion
        ? buildMockInterviewPrompt(
            selectedQuestion,
            message,
            history,
            activeInterviewState,
            intent
          )
        : buildNormalChatPrompt(message, selectedTopic);

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();
    const nextInterviewState =
      mode === "mockInterview"
        ? {
            stage:
              intent === "start"
                ? activeInterviewState.stage
                : getNextStage(activeInterviewState.stage, intent),
            hintsUsed:
              intent === "hint"
                ? activeInterviewState.hintsUsed + 1
                : activeInterviewState.hintsUsed
          }
        : null;

    return NextResponse.json({
      reply: aiText,
      question: selectedQuestion,
      interviewState: nextInterviewState
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong. Please try again.";

    console.error("[api/chat] request failed:", error);

    return NextResponse.json(
      {
        error: message || "Something went wrong. Please try again."
      },
      { status: 500 }
    );
  }
}
