import { useState } from "react";

export default function InputBox({ onSubmit, disabled }) {
  const [value, setValue] = useState("");
  function send(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSubmit(v);
    setValue("");
  }
  return (
    <form onSubmit={send} className="flex gap-2">
      <input
        className="flex-1 rounded-xl px-4 py-2 border border-white/10 bg-white/10 backdrop-blur"
        placeholder="Type your action (e.g., light a torch)"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        className="rounded-xl px-4 py-2 bg-black/70 hover:bg-black text-white shadow transition disabled:opacity-50"
        disabled={disabled}
      >
        Submit
      </button>
    </form>
  );
}
