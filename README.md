# DSA Interview Coach

DSA Interview Coach is a full-stack AI chatbot web application for practicing Data Structures and Algorithms interview questions through a mock interview experience. It uses Next.js App Router, TypeScript, Tailwind CSS, and the Gemini API to create a ChatGPT-style interview workflow around Striver SDE Sheet inspired questions.

## Features

- ChatGPT-style chat UI with user messages on the right and coach replies on the left
- Welcome screen with quick-start interview actions
- Topic-based interview flows for Arrays, Binary Trees, and Dynamic Programming
- Gemini-powered mock interview prompts with staged interview behavior
- Mock interview flow that asks for approach first, then time complexity, then space complexity, then optimizations
- Gradual hint system that avoids revealing the full solution too early
- Full solution reveal only when the user explicitly asks for it
- Striver SDE Sheet inspired dataset with 20+ DSA interview questions
- Loading indicator, reset chat action, mobile responsiveness, and API error handling

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Gemini API via `@google/generative-ai`
- Vercel-ready deployment structure

## Dataset Source

The dataset is inspired by the Striver SDE Sheet and includes interview-style questions across:

- Arrays
- Strings
- Linked Lists
- Binary Trees
- Graphs
- Dynamic Programming

The dataset lives in [/Users/priyanka/Documents/Projects/ThinklyLab/data/striverQuestions.ts](./data/striverQuestions.ts).

## Project Structure

```text
/app
  /api
    /chat
      route.ts
  page.tsx

/components
  ChatMessage.tsx
  ChatInput.tsx
  SuggestionButtons.tsx
  Header.tsx

/data
  striverQuestions.ts

/lib
  gemini.ts
```

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.local.example .env.local
```

3. Add your Gemini API key in `.env.local`:

```bash
GEMINI_API_KEY=your_actual_key_here
GEMINI_MODEL=gemini-2.5-flash
```

4. Start the development server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Environment Variables

- `GEMINI_API_KEY`: your Google Generative AI API key
- `GEMINI_MODEL`: optional Gemini model override, defaults to `gemini-2.5-flash`

## Deployment On Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings.
4. Optionally add `GEMINI_MODEL=gemini-2.5-flash`.
5. Deploy.

## Notes

- The mock interview route is implemented in [/Users/priyanka/Documents/Projects/ThinklyLab/app/api/chat/route.ts](./app/api/chat/route.ts).
- Gemini responses are generated with `GEMINI_MODEL` or default to `gemini-2.5-flash`.
