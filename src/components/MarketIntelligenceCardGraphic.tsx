export default function MarketIntelligenceCardGraphic() {
  const items = [
    { label: 'VA construction notice', score: '92', color: 'bg-emerald-400' },
    { label: 'DHS recompete signal', score: '81', color: 'bg-cyan-400' },
    { label: 'USACE teaming lead', score: '74', color: 'bg-amber-300' },
  ];

  return (
    <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-800 p-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.34),transparent_24%),radial-gradient(circle_at_86%_10%,rgba(245,158,11,0.24),transparent_28%)]" />
      <div className="relative h-full">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">
            MARKET INTEL
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-100">Live brief</span>
          </div>
        </div>

        <div className="grid h-[126px] grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <p className="text-[10px] font-semibold uppercase text-cyan-200">Today&apos;s priorities</p>
                <p className="text-sm font-bold">6 ranked matches</p>
              </div>
              <span className="rounded-md bg-emerald-400/20 px-2 py-1 text-[10px] font-bold text-emerald-100">
                NAICS fit
              </span>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-8 w-1 rounded-full ${item.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-slate-50">{item.label}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10">
                      <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-white/15 bg-slate-950/45 p-3 backdrop-blur">
              <p className="text-[10px] font-semibold uppercase text-violet-200">Next move</p>
              <p className="mt-1 text-xs font-bold leading-snug">Review VA bidder fit before noon</p>
            </div>
            <div className="flex-1 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <p className="text-[10px] font-semibold uppercase text-amber-100">Signal mix</p>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="h-8 w-4 rounded-t bg-cyan-300" />
                <span className="h-12 w-4 rounded-t bg-emerald-300" />
                <span className="h-6 w-4 rounded-t bg-violet-300" />
                <span className="h-10 w-4 rounded-t bg-amber-300" />
              </div>
              <p className="mt-2 text-[11px] text-slate-200">Daily + weekly + pursuit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
