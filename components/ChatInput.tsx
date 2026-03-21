type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false
}: ChatInputProps) {
  return (
    <div className="flex items-end gap-4 rounded-[30px] border border-slate-200 bg-white px-6 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition focus-within:border-cyan-300 focus-within:ring-4 focus-within:ring-cyan-100">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
          }
        }}
        disabled={disabled}
        rows={1}
        placeholder="Share your approach, ask for a hint, or start a mock interview..."
        className="max-h-40 min-h-[52px] flex-1 resize-none border-0 bg-transparent px-0 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="inline-flex h-14 min-w-[96px] items-center justify-center rounded-full bg-slate-300 px-6 text-lg font-medium text-white transition hover:scale-105 hover:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-300"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}
