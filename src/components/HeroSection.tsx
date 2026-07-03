import { ArrowDown, Leaf } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-energy.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/80 to-emerald-900/45" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(44, 199, 101, 0.15),transparent_32%)]" />

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

          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/90">
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