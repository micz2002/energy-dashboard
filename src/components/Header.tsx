import { Activity, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-950/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-white">
            <Zap size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-950">
            EcoGrid GB
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 sm:flex">
          <Activity size={16} />
          Live energy forecast
        </div>
      </div>
    </header>
  );
}