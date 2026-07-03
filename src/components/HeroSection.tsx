import { ArrowDown, Leaf } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.35),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(14,165,233,0.28),transparent_28%),linear-gradient(120deg,rgba(2,6,23,0.95),rgba(6,78,59,0.75))]" />

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur">
            <Leaf size={16} />
            Great Britain clean energy insights
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Great Britain Energy Mix Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            Track forecasted generation mix data and find the cleanest charging
            window for your electric vehicle.
          </p>

          <a
            href="#energy-mix"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-950 shadow-lg transition hover:bg-emerald-50"
          >
            View forecast
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}