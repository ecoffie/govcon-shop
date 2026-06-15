export default function DailyAlertsCardGraphic() {
  const rows = [
    { tag: 'Presolicitation', title: 'VA facility upgrade', due: '2 days' },
    { tag: 'Sources Sought', title: 'USACE design support', due: '6 days' },
    { tag: 'RFQ', title: 'DHS field services', due: '12 days' },
  ];

  return (
    <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-violet-900 p-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(59,130,246,0.35),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(168,85,247,0.32),transparent_28%)]" />
      <div className="relative h-full">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">
            DAILY ALERTS
          </span>
          <span className="rounded-md bg-emerald-400/20 px-2 py-1 text-[10px] font-bold text-emerald-100">
            Free beta
          </span>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
          <div className="mb-2 border-b border-white/10 pb-2">
            <p className="text-[10px] font-semibold uppercase text-blue-200">Saved search matches</p>
            <p className="text-sm font-bold">New opportunities today</p>
          </div>

          <div className="space-y-2">
            {rows.map((row, index) => (
              <div key={row.title} className="rounded-lg bg-slate-950/35 p-2">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                    index === 0 ? 'bg-orange-300/20 text-orange-100' : index === 1 ? 'bg-violet-300/20 text-violet-100' : 'bg-blue-300/20 text-blue-100'
                  }`}>
                    {row.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-100">{row.due}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  <p className="truncate text-[11px] font-semibold text-slate-50">{row.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
