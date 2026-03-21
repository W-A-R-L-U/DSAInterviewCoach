type HeaderProps = {
  onReset: () => void;
  disabled?: boolean;
  timer?: string | null;
  timerWarning?: boolean;
  showReset?: boolean;
};

export function Header({
  onReset,
  disabled = false,
  timer = null,
  timerWarning = false,
  showReset = true
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div>
          <h1 className="text-[1.02rem] font-medium tracking-[-0.04em] text-slate-900">
            DSA Interview Coach
          </h1>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {timer ? (
            <div
              className={[
                "inline-flex h-9 items-center justify-center rounded-full border px-4 text-[0.82rem] font-medium",
                timerWarning
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 bg-white text-slate-600"
              ].join(" ")}
            >
              {timer}
            </div>
          ) : null}
          {showReset ? (
            <button
              type="button"
              onClick={onReset}
              disabled={disabled}
              className="inline-flex h-9 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-[0.82rem] font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Chat
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
