type ChatMessageProps = {
  role: "user" | "assistant" | "system";
  content: string;
  loading?: boolean;
};

export function ChatMessage({
  role,
  content,
  loading = false
}: ChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[88%] rounded-[26px] px-4 py-3 shadow-sm transition-colors sm:max-w-[78%]",
          isUser
            ? "rounded-br-md bg-slate-900 text-white"
            : isSystem
              ? "rounded-bl-md border border-amber-200 bg-amber-50 text-amber-900"
              : "rounded-bl-md border border-slate-200 bg-white text-slate-900"
        ].join(" ")}
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">
          {isUser ? "You" : isSystem ? "System" : "Coach"}
        </p>
        {loading ? (
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current" />
            </div>
            <span>Interviewer is thinking...</span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-7 sm:text-base">{content}</p>
        )}
      </div>
    </div>
  );
}
