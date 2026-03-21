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
            "overflow-hidden rounded-full border border-slate-300 bg-white text-left font-medium text-slate-700 transition",
            compact
              ? "min-h-[44px] max-w-[190px] px-4 py-2.5 text-[0.88rem] hover:bg-slate-50"
              : "min-h-[44px] max-w-[190px] px-4 py-2.5 text-[0.9rem] hover:bg-slate-50",
            "disabled:cursor-not-allowed disabled:opacity-60"
          ].join(" ")}
        >
          <span className="block leading-5">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
