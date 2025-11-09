const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

export async function nextTurn({ state, lastAction, sessionId }) {
  const url = new URL(`${API_BASE}/story/next`);
  url.searchParams.set("session_id", sessionId || "default");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state, last_action: lastAction }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function loadState(sessionId) {
  const url = new URL(`${API_BASE}/story/load`);
  url.searchParams.set("session_id", sessionId || "default");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
