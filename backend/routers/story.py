from fastapi import APIRouter, Query
from ..models.io import DMRequest, DMResponse, DMOption
from ..services.story_engine import StoryEngine
from ..services.memory import MemoryStore

router = APIRouter(prefix="/story", tags=["story"])
engine = StoryEngine()
store = MemoryStore()

@router.post("/next", response_model=DMResponse)
async def next_turn(req: DMRequest, session_id: str = Query("default")):
    result = engine.generate(req.state, req.last_action)
    state = req.state.copy()
    for k, v in result["state_changes"].items():
        state[k] = v
    store.save(session_id, state)
    return DMResponse(
        narrative=result["narrative"],
        options=[DMOption(**o) for o in result["options"]],
        state_changes=result["state_changes"],
    )

@router.get("/load")
async def load_state(session_id: str = Query("default")):
    return store.load(session_id) or {}
