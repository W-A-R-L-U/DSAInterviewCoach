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
    <div className="flex items-end gap-3 rounded-[28px] border border-[var(--surface-border)] bg-[var(--surface-bg)] px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition focus-within:border-[var(--color-primary)]">
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
        placeholder="Message DSA Interview Coach..."
        className="max-h-40 min-h-[44px] w-full flex-1 resize-none border-0 bg-transparent px-0 py-1.5 text-[0.95rem] text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="inline-flex h-10 min-w-[68px] items-center justify-center rounded-full bg-[var(--color-primary)] px-4 text-[0.9rem] font-medium text-[var(--color-primary-text)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-slate-300"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}
