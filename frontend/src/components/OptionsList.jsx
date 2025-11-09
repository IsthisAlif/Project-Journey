export default function OptionsList({ options = [], onChoose }) {
  if (!options.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {options.map(opt => (
        <button
          key={opt.id}
          className="text-left rounded-xl px-4 py-2 shadow hover:shadow-md border border-white/10 hover:border-white/25 transition"
          onClick={() => onChoose(opt.text)}
        >
          {opt.id}. {opt.text}
        </button>
      ))}
    </div>
  );
}
