export default function CategoryStatCard({ category, count, desc, color }) {
  return (
    <div className={`bg-slate-800 rounded-lg p-4 shadow flex flex-col min-w-[200px] border-l-4 ${color}`}>
      <div className="text-2xl font-bold mb-1">{count}</div>
      <div className="text-slate-100 font-semibold mb-1">{category}</div>
      <div className="text-slate-400 text-xs">{desc}</div>
    </div>
  );
}
