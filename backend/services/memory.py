import json
from typing import Any, Dict
from pathlib import Path

class MemoryStore:
    """Simple file-backed memory; later we can switch to SQLite."""
    def __init__(self, base_path: str = "database/project_journey_saves"):
        self.base = Path(base_path)
        self.base.mkdir(parents=True, exist_ok=True)

    def load(self, session_id: str) -> Dict[str, Any] | None:
        path = self.base / f"{session_id}.json"
        if not path.exists():
            return None
        return json.loads(path.read_text(encoding="utf-8"))

    def save(self, session_id: str, state: Dict[str, Any]) -> None:
        path = self.base / f"{session_id}.json"
        path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
