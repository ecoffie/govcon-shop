const alertRows = [
  {
    type: 'Combined Synopsis/Solicitation',
    setAside: 'SBA',
    score: '45%',
    title: 'Green Mountain General Roads/Civil Construction IDIQ',
    agency: 'AGRICULTURE, DEPARTMENT OF',
    naics: '237310',
    posted: 'Apr 21, 2026',
    due: 'May 19, 2026',
    typeClass: 'bg-teal-100 text-teal-800',
  },
  {
    type: 'Solicitation',
    setAside: 'NONE',
    score: '40%',
    title: 'Building 107 Construction Project at the Charlestown Navy Yard',
    agency: 'GENERAL SERVICES ADMINISTRATION',
    naics: '236220',
    posted: 'Apr 21, 2026',
    due: 'May 28, 2026',
    typeClass: 'bg-emerald-100 text-emerald-800',
  },
  {
    type: 'Presolicitation',
    setAside: '',
    score: '35%',
    title: 'Presolicitation notice for design-build groundwater treatment',
    agency: 'DEPT OF DEFENSE',
    naics: '237110',
    posted: 'Apr 23, 2026',
    due: 'May 8, 2026',
    typeClass: 'bg-orange-100 text-orange-800',
  },
];

export default function DailyAlertsEmailPreview() {
  return (
    <div className="h-full w-full overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 bg-white px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-950">6 New Opportunities - Apr 24, 2026</p>
              <p className="mt-1 text-xs text-slate-500">
                From <span className="font-semibold text-blue-600">Alerts</span> to Eric Coffie
              </p>
            </div>
            <span className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-500">Inbox</span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="bg-slate-800 px-5 py-4 text-white">
              <p className="text-sm">
                <span className="font-bold">Filters:</span> NAICS 236, 237, 238 - NY
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {alertRows.map((row, index) => (
                <div key={row.title} className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${row.typeClass}`}>
                      {row.type}
                    </span>
                    {row.setAside ? (
                      <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700">
                        {row.setAside}
                      </span>
                    ) : null}
                    <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                      {row.score}
                    </span>
                  </div>
                  <p className="text-base font-extrabold leading-snug text-blue-800">
                    {index + 1}. {row.title}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.agency} - NAICS {row.naics}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Posted {row.posted} <span className="mx-1">-</span>
                    <span className="font-bold text-emerald-600">Due {row.due}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-center">
            <p className="text-sm font-bold text-emerald-900">Was this alert helpful?</p>
            <div className="mt-3 flex justify-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-white">Yes</span>
              <span className="rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white">No</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
