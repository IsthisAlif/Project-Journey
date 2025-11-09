export default function TopBar({ sessionId, setSessionId, location, onNewGame, onLoadGame }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white/5 p-3 rounded-2xl shadow">
      <div className="flex items-center gap-3">
        <h1 className="text-lg sm:text-xl font-bold">🧭 Project Journey</h1>
        {location && <span className="text-sm opacity-80">📍 {location}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="rounded-xl px-3 py-1 text-sm border border-white/10 bg-white/10"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="Session ID"
          title="Session ID"
        />
        <button
          onClick={onNewGame}
          className="px-3 py-1 text-sm rounded-xl bg-emerald-600 hover:bg-emerald-500 transition"
        >
          New Game
        </button>
        <button
          onClick={onLoadGame}
          className="px-3 py-1 text-sm rounded-xl bg-slate-600 hover:bg-slate-500 transition"
        >
          Load
        </button>
      </div>
    </div>
  );
}
