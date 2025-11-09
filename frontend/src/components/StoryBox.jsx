export default function StoryBox({ text }) {
  return (
    <div className="whitespace-pre-wrap leading-7 bg-white/5 rounded-2xl p-4 shadow">
      {text || "Your journey awaits..."}
    </div>
  );
}
