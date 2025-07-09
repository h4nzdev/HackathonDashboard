import { Bell, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
      <h1 className="text-xl font-bold text-slate-100">Cebu Anti-Human Trafficking Dashboard</h1>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-300 hover:text-slate-100">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-slate-300 hover:text-slate-100">
          <UserCircle size={28} />
        </button>
      </div>
    </header>
  );
}
