export default function CategoryStatCard({ category, count, desc, color }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-750 transition-colors duration-200 ${color.replace('border-', 'border-l-4 border-l-')}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl font-bold text-slate-100">{count}</span>
        <span className={`w-2 h-2 rounded-full ${color.replace('border-', 'bg-')}`}></span>
      </div>
      <div className="space-y-1">
        <div className="text-slate-100 font-medium text-sm leading-tight" title={category}>
          {category}
        </div>
        <div className="text-slate-400 text-xs leading-relaxed" title={desc}>
          {desc}
        </div>
      </div>
    </div>
  );
}
