from pydantic import BaseModel
from typing import List, Any, Dict

class DMRequest(BaseModel):
    state: Dict[str, Any]
    last_action: str

class DMOption(BaseModel):
    id: int
    text: str

class DMResponse(BaseModel):
    narrative: str
    options: List[DMOption]
    state_changes: Dict[str, Any]
