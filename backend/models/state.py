from pydantic import BaseModel, Field
from typing import List, Dict, Any

class Player(BaseModel):
    name: str = "Adventurer"
    klass: str = "Novice"
    hp: int = 10
    inventory: List[str] = Field(default_factory=list)

class GameState(BaseModel):
    player: Player = Player()
    party: List[Dict[str, Any]] = Field(default_factory=list)
    location: str = "Elderwood Outskirts"
    world_facts: List[str] = Field(default_factory=list)
    recent_events: List[str] = Field(default_factory=list)
    rng_seed: int | None = None
