# Project Journey

**Project Journey** is an AI Dungeon Master engine built with FastAPI and React.

🧠 The AI maintains a persistent world state and narrates a unique adventure with every decision.

---

## Features
- AI-driven storytelling (structured LLM prompting)
- Persistent memory system (save/load states)
- FastAPI backend, React + Tailwind frontend
- Dice-roll based outcomes for dynamic encounters

---

## Run locally

### 1️⃣ Backend
```bash
uvicorn backend.main:app --reload
