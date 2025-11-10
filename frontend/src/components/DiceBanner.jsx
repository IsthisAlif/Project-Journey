export default function DiceBanner({ roll, outcome, onHide, visible }) {
  // Color accent by outcome
  const color =
    outcome === "critical success" ? "from-emerald-500/90 to-emerald-400/60" :
    outcome === "success"          ? "from-emerald-400/80 to-emerald-300/50" :
    outcome === "mixed"            ? "from-amber-400/80 to-amber-300/50" :
    outcome === "failure"          ? "from-rose-500/80 to-rose-400/50" :
                                     "from-rose-600/90 to-rose-500/60"; // critical failure

  return (
    <div
      className={`fixed left-1/2 top-6 -translate-x-1/2 z-50 transition
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                 `}
      aria-live="polite"
    >
      <div className={`rounded-2xl px-5 py-3 shadow-xl text-white
                       bg-gradient-to-br ${color} backdrop-blur`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black">🎲 {roll}</div>
          <div className="text-sm uppercase tracking-wide">{outcome}</div>
          <button onClick={onHide} className="ml-3 text-white/80 hover:text-white">✕</button>
        </div>
      </div>
    </div>
  );
}
