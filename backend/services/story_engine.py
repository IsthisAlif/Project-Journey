from typing import Dict, Any
import random

PROMPT_TEMPLATE = """You are "Project Journey", a Dungeon Master.
Maintain consistency with the WORLD STATE.
If the player attempts the impossible, explain why.

Respond in this STRICT format:

Narrative: <2–6 sentences>
Options:
1) <choice>
2) <choice>
3) <choice>
State_Changes (JSON patch):
<valid JSON object>

WORLD STATE:
{state_json}

LAST ACTION:
{last_action}
"""

def roll_d20() -> int:
    return random.randint(1, 20)

class StoryEngine:
    """Temporary local generator — later replaced with GPT API."""
    def generate(self, state: Dict[str, Any], last_action: str) -> Dict[str, Any]:
        if (seed := state.get("rng_seed")) is not None:
            random.seed(seed + len(last_action))

        d20 = roll_d20()
        narrative = (
            f"You attempt '{last_action}'. The air around {state.get('location','the area')} trembles. "
            f"The dice of fate rolls a {d20}, deciding your destiny."
        )
        options = [
            {"id": 1, "text": "Advance cautiously."},
            {"id": 2, "text": "Attack with full force."},
            {"id": 3, "text": "Retreat and rethink strategy."},
        ]
        state_changes = {
            "recent_events": state.get("recent_events", []) + [f"Action '{last_action}' (d20: {d20})"]
        }
        return {"narrative": narrative, "options": options, "state_changes": state_changes}
