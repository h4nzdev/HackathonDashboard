export default function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div className="flex items-center p-4 rounded-lg shadow bg-slate-800 text-slate-100 min-w-[180px]">
      <div className={`p-2 rounded-full ${color} mr-4`}>
        <Icon size={28} />
      </div>
      <div>
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-slate-400 text-sm">{title}</div>
      </div>
    </div>
  );
}
