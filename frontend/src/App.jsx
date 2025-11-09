import { useEffect, useState } from "react";
import StoryBox from "./components/StoryBox.jsx";
import OptionsList from "./components/OptionsList.jsx";
import InputBox from "./components/InputBox.jsx";
import { nextTurn, loadState } from "./lib/api.js";

export default function App() {
  const [sessionId, setSessionId] = useState("demo");
  const [state, setState] = useState({ location: "Elderwood Forest", recent_events: [] });
  const [narrative, setNarrative] = useState("");
  const [options, setOptions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const saved = await loadState(sessionId);
        if (saved && Object.keys(saved).length) setState(saved);
      } catch (e) { setError(e.message); }
    })();
  }, [sessionId]);

  async function act(lastAction) {
    setBusy(true); setError("");
    try {
      const res = await nextTurn({ state, lastAction, sessionId });
      setState({ ...state, ...res.state_changes });
      setNarrative(res.narrative);
      setOptions(res.options || []);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-bold">Project Journey — {state.location}</h1>
          <input
            className="rounded-lg px-3 py-1 border border-white/10 bg-white/10"
            value={sessionId}
            onChange={e => setSessionId(e.target.value)}
            title="Session ID"
          />
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">{error}</div>}

        <StoryBox text={narrative} />
        <OptionsList options={options} onChoose={act} />
        <InputBox onSubmit={act} disabled={busy} />

        <div className="text-xs opacity-70 text-center">Tip: choose an option or type your own action.</div>
      </div>
    </div>
  );
}

<div className="text-3xl font-bold text-emerald-400">Tailwind OK</div>
