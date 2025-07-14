import { Bell, UserCircle } from "lucide-react";
import JuvoIcon from "../assets/juvo.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center">
        <img src={JuvoIcon} className="w-10 h-10"/>
        <h1 className="text-xl text-slate-100 tracking-widest">JUVO</h1>
      </div>
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
