type SuggestionButtonsProps = {
  onSelect: (label: string) => void;
  disabled?: boolean;
  compact?: boolean;
};

const suggestions = ["Start Mock Interview"];

export function SuggestionButtons({
  onSelect,
  disabled = false,
  compact = false
}: SuggestionButtonsProps) {
  return (
    <div
      className={[
        "grid gap-3",
        compact ? "grid-cols-1" : "grid-cols-1"
      ].join(" ")}
    >
      {suggestions.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          disabled={disabled}
          className={[
            "overflow-hidden rounded-full text-left font-medium transition",
            compact
              ? "border border-slate-300 bg-white max-w-[190px] px-4 py-2.5 text-[0.88rem] text-slate-700 hover:bg-slate-50"
              : "bg-[var(--color-primary)] px-7 py-3.5 text-[0.96rem] text-[var(--color-primary-text)] shadow-[0_14px_30px_rgba(79,70,229,0.28)] hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]",
            "disabled:cursor-not-allowed disabled:opacity-60"
          ].join(" ")}
        >
          <span className="block leading-5">
            {compact ? label : `Start Mock Interview`}
          </span>
        </button>
      ))}
    </div>
  );
}
