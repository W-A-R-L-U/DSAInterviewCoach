type HeaderProps = {
  onReset: () => void;
  disabled?: boolean;
};

export function Header({ onReset, disabled = false }: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-slate-200/80 px-8 py-7 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          DSA Interview Coach
        </h1>
        <p className="max-w-3xl text-base leading-9 text-slate-600 sm:text-[1.1rem]">
          Practice Data Structures and Algorithms interviews with an AI interviewer
          trained on Striver SDE Sheet questions.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-3 sm:justify-end">
        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          className="inline-flex h-14 items-center justify-center rounded-full border-2 border-blue-600 bg-white px-7 text-lg font-medium text-slate-600 transition hover:scale-105 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Chat
        </button>
      </div>
    </header>
  );
}
