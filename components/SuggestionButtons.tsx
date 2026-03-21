type SuggestionButtonsProps = {
  onSelect: (label: string) => void;
  disabled?: boolean;
  compact?: boolean;
};

const suggestions = [
  "Start Mock Interview",
  "Arrays Question",
  "Trees Question",
  "Dynamic Programming Question"
];

export function SuggestionButtons({
  onSelect,
  disabled = false,
  compact = false
}: SuggestionButtonsProps) {
  return (
    <div
      className={[
        "grid gap-4",
        compact ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4"
      ].join(" ")}
    >
      {suggestions.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          disabled={disabled}
          className={[
            "rounded-[24px] border border-cyan-200 bg-cyan-50 text-left font-medium text-slate-700 transition",
            compact
              ? "min-h-[64px] px-6 py-4 text-base hover:scale-[1.01]"
              : "min-h-[116px] px-6 py-5 text-[1.05rem] hover:-translate-y-0.5 hover:scale-[1.02]",
            "hover:border-cyan-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          ].join(" ")}
        >
          <span className="block max-w-[12ch] leading-8">{label}</span>
        </button>
      ))}
    </div>
  );
}
