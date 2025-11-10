import { useEffect, useRef, useState } from "react";
import StoryBox from "./components/StoryBox.jsx";
import OptionsList from "./components/OptionsList.jsx";
import InputBox from "./components/InputBox.jsx";
import TopBar from "./components/TopBar.jsx"; // from Step 3
import DiceBanner from "./components/DiceBanner.jsx";
import { nextTurn, loadState } from "./lib/api.js";

export default function App() {
  const [sessionId, setSessionId] = useState("demo");
  const [state, setState] = useState({ location: "Elderwood Forest", recent_events: [] });
  const [narrative, setNarrative] = useState("");
  const [options, setOptions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Dice banner state
  const [dice, setDice] = useState({ roll: null, outcome: "" });
  const [diceVisible, setDiceVisible] = useState(false);
  const diceTimer = useRef(null);

  function showDice(roll, outcome) {
    setDice({ roll, outcome });
    setDiceVisible(true);
    clearTimeout(diceTimer.current);
    diceTimer.current = setTimeout(() => setDiceVisible(false), 1800);
  }

  async function handleLoadGame() {
    setError("");
    try {
      const saved = await loadState(sessionId);
      if (saved && Object.keys(saved).length) {
        setState(saved);
        setNarrative("🔁 Game loaded!");
      } else {
        setState({ location: "Elderwood Forest", recent_events: [] });
        setNarrative("No save found. Starting a new adventure...");
        setOptions([]);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  function handleNewGame() {
    setState({ location: "Elderwood Forest", recent_events: [] });
    setNarrative("🌱 A new journey begins...");
    setOptions([]);
  }

  async function act(lastAction) {
    setBusy(true);
    setError("");
    try {
      const res = await nextTurn({ state, lastAction, sessionId });
      setState({ ...state, ...res.state_changes });
      setNarrative(res.narrative);
      setOptions(res.options || []);
      // NEW: dice banner
      const maybe = res?.meta?.dice;
      if (maybe?.type === "d20" && typeof maybe.roll === "number") {
        showDice(maybe.roll, maybe.outcome || "");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    handleLoadGame();
    return () => clearTimeout(diceTimer.current);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      {/* Dice banner */}
      <DiceBanner
        roll={dice.roll}
        outcome={dice.outcome}
        visible={diceVisible}
        onHide={() => setDiceVisible(false)}
      />

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4">
        <TopBar
          sessionId={sessionId}
          setSessionId={setSessionId}
          location={state.location}
          onNewGame={handleNewGame}
          onLoadGame={handleLoadGame}
        />

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">
            {error}
          </div>
        )}

        <StoryBox text={narrative} />
        <OptionsList options={options} onChoose={act} />
        <InputBox onSubmit={act} disabled={busy} />

        <div className="text-xs opacity-70 text-center">
          Tip: choose an option or type your own action.
        </div>
      </div>
    </div>
  );
}
