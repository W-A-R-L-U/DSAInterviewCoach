"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Header } from "@/components/Header";
import { SuggestionButtons } from "@/components/SuggestionButtons";
import { type StriverQuestion } from "@/data/striverQuestions";

type ChatRole = "user" | "assistant" | "system";

type UiMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatMode = "mockInterview" | "normalChat";
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

function inferTopicFromSuggestion(label: string): string | undefined {
  if (label.includes("Array")) {
    return "Arrays";
  }

  if (label.includes("Tree")) {
    return "Binary Trees";
  }

  if (label.includes("Dynamic Programming")) {
    return "Dynamic Programming";
  }

  return undefined;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const MOCK_INTERVIEW_DURATION_SECONDS = 45 * 60;
const MOCK_INTERVIEW_WARNING_SECONDS = 5 * 60;

function formatRemainingTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function HomePage() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>("normalChat");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState<StriverQuestion | null>(null);
  const [interviewState, setInterviewState] = useState<InterviewState | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [interviewExpired, setInterviewExpired] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const expiryAnnouncedRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (mode !== "mockInterview" || timeRemaining === null || interviewExpired) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous === null) {
          return previous;
        }

        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mode, timeRemaining, interviewExpired]);

  useEffect(() => {
    if (mode !== "mockInterview" || timeRemaining !== 0 || expiryAnnouncedRef.current) {
      return;
    }

    expiryAnnouncedRef.current = true;
    setInterviewExpired(true);
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: "system",
        content:
          "Your 45-minute mock interview has ended. Reset chat to start a fresh interview."
      }
    ]);
  }, [mode, timeRemaining]);

  const chatHistory = useMemo(
    () =>
      messages
        .filter((message) => message.role !== "system")
        .map((message) => ({
          role: message.role === "user" ? "user" : "assistant",
          content: message.content
        })),
    [messages]
  );

  async function sendMessage(message: string, nextMode = mode, nextTopic = selectedTopic) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || (nextMode === "mockInterview" && interviewExpired)) {
      return;
    }

    const userMessage: UiMessage = {
      id: makeId(),
      role: "user",
      content: trimmedMessage
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmedMessage,
          mode: nextMode,
          selectedTopic: nextTopic,
          currentQuestion,
          interviewState,
          history: [...chatHistory, { role: "user", content: trimmedMessage }]
        })
      });

      const contentType = response.headers.get("content-type") || "";
      const payloadText = await response.text();

      if (!contentType.includes("application/json")) {
        throw new Error("The server returned an unexpected response. Please restart the app and try again.");
      }

      const data = JSON.parse(payloadText) as {
        reply?: string;
        error?: string;
        question?: StriverQuestion | null;
        interviewState?: InterviewState | null;
      };

      const replyText = data.reply;

      if (!response.ok || !replyText) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setCurrentQuestion(data.question ?? null);
      setInterviewState(data.interviewState ?? null);
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: replyText
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "system",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestion(label: string) {
    const nextMode: ChatMode = "mockInterview";
    const nextTopic = inferTopicFromSuggestion(label);

    expiryAnnouncedRef.current = false;
    setMode(nextMode);
    setSelectedTopic(nextTopic);
    setCurrentQuestion(null);
    setInterviewExpired(false);
    setTimeRemaining(MOCK_INTERVIEW_DURATION_SECONDS);
    setInterviewState({
      stage: "approach",
      hintsUsed: 0
    });

    void sendMessage(label, nextMode, nextTopic);
  }

  function handleReset() {
    expiryAnnouncedRef.current = false;
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setMode("normalChat");
    setSelectedTopic(undefined);
    setCurrentQuestion(null);
    setInterviewState(null);
    setTimeRemaining(null);
    setInterviewExpired(false);
  }

  const currentQuestionPanel = currentQuestion ? (
    <section className="border-b border-slate-200/80 bg-slate-50/80 px-5 py-4 sm:px-7">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            Current Question
          </p>
          <h2 className="text-xl font-semibold text-slate-950">
            {currentQuestion.title}
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            {currentQuestion.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
            {mode === "mockInterview" ? "Mock Interview" : "Practice"}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
            {selectedTopic || currentQuestion.topic}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
            {currentQuestion.difficulty}
          </span>
          {timeRemaining !== null ? (
            <span
              className={[
                "rounded-full border px-3 py-1.5",
                timeRemaining <= MOCK_INTERVIEW_WARNING_SECONDS
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 bg-white text-slate-700"
              ].join(" ")}
            >
              {formatRemainingTime(timeRemaining)}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  ) : null;

  const emptyState = (
    <section className="grid flex-1 gap-10 px-8 py-10 lg:grid-cols-[1.3fr_0.9fr]">
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">
            Welcome Screen
          </div>
          <h2 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            DSA Interview Coach
          </h2>
          <p className="max-w-4xl text-xl leading-10 text-slate-600">
            Practice Data Structures and Algorithms interviews with an AI interviewer
            trained on Striver SDE Sheet questions.
          </p>
        </div>

        <div className="max-w-5xl">
          <SuggestionButtons onSelect={handleSuggestion} disabled={isLoading} />
        </div>
      </div>

      <aside className="rounded-[32px] border border-slate-200 bg-slate-50 px-8 py-10">
        <h3 className="text-2xl font-semibold text-slate-900">What this coach does</h3>
        <div className="mt-10 space-y-8 text-lg leading-9 text-slate-600">
          <p>Runs topic-based mock interviews across Arrays, Trees, Graphs, DP, and more.</p>
          <p>Asks follow-up questions like a real interviewer instead of dumping a solution.</p>
          <p>Gives hints when you get stuck.</p>
          <p>Works as a clean full-stack app ready for Vercel deployment.</p>
        </div>
      </aside>
    </section>
  );

  const chatView = (
    <section className="flex flex-1 flex-col overflow-hidden bg-slate-50/60">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-8 scroll-smooth"
      >
        <div className="mx-auto max-w-4xl space-y-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading ? (
            <ChatMessage role="assistant" content="" loading />
          ) : null}
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[38px] border border-slate-200/80 bg-white shadow-panel">
          <Header
            onReset={handleReset}
            disabled={isLoading}
          />

          {currentQuestionPanel}
          {messages.length === 0 ? emptyState : chatView}

          <div className="border-t border-slate-200/80 bg-white px-8 py-6">
            <div className="mx-auto max-w-4xl space-y-4">
              <SuggestionButtons onSelect={handleSuggestion} disabled={isLoading} compact />
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={() => void sendMessage(input)}
                disabled={isLoading || interviewExpired}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
