export default function HeatmapMap() {
  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow mt-6">
      <h2 className="text-lg font-semibold mb-3 text-slate-100">Cebu Trafficking Risk Heatmap</h2>
      <div className="w-full h-64 bg-slate-700 rounded flex items-center justify-center text-slate-400 mb-4">
        {/* Placeholder for future map/heatmap */}
        <span>Heatmap will be displayed here</span>
      </div>
      <div className="flex gap-4 items-center">
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-red-600 rounded mr-1 inline-block"></span>High Risk</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-400 rounded mr-1 inline-block"></span>Medium</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded mr-1 inline-block"></span>Low</span>
      </div>
    </div>
  );
}
