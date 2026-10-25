import type { GithubStats, ContributionWeek } from "@/lib/github-stats";

/** Cell fill per contribution level, from empty to busiest. */
const LEVEL_CLASS = [
  "bg-surface-container-highest",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
] as const;

/** Weeks kept on phones; wider screens show the full year. */
const MOBILE_WEEKS = 26;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Month label for a week when it opens a new month, otherwise empty. */
const monthLabels = (weeks: ContributionWeek[]) => {
  let last = -1;
  return weeks.map((week) => {
    const month = new Date(week.days[0].date).getUTCMonth();
    if (month === last) return "";
    last = month;
    return MONTHS[month];
  });
};

const formatPercent = (value: number) =>
  value < 1 ? "<1%" : `${Math.round(value)}%`;

function Languages({ languages }: { languages: GithubStats["languages"] }) {
  return (
    <div className="rounded-3xl bg-surface-container-low p-6">
      <h4 className="text-base font-medium text-on-surface">Languages</h4>
      <p className="text-sm text-on-surface-variant">
        公開リポジトリの言語比率
      </p>
      <div className="mt-5 flex h-3 gap-1">
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="min-w-1 rounded-full"
            style={{ flexGrow: lang.percent, backgroundColor: lang.color }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((lang) => (
          <li key={lang.name} className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-2.5 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-on-surface">{lang.name}</span>
            <span className="font-mono text-xs text-on-surface-variant tabular-nums">
              {formatPercent(lang.percent)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Calendar({
  weeks,
  total,
}: {
  weeks: ContributionWeek[];
  total: number;
}) {
  const labels = monthLabels(weeks);
  const firstMobileWeek = Math.max(0, weeks.length - MOBILE_WEEKS);
  // Columns beyond the phone window are hidden below md, so the grid must
  // be sized for the visible count at each breakpoint.
  const gridStyle = {
    "--cols": weeks.length,
    "--cols-mobile": Math.min(weeks.length, MOBILE_WEEKS),
  } as React.CSSProperties;

  return (
    <div className="rounded-3xl bg-surface-container-low p-6 md:col-span-2">
      <h4 className="text-base font-medium text-on-surface">Contributions</h4>
      <p className="text-sm text-on-surface-variant">
        直近 1 年で{" "}
        <span className="font-medium text-on-surface tabular-nums">
          {total.toLocaleString("en-US")}
        </span>
      </p>
      <div
        className="grid gap-[3px] mt-5 grid-cols-[repeat(var(--cols-mobile),minmax(0,1fr))] md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        style={gridStyle}
      >
        {weeks.map((week, i) => (
          <div
            key={week.days[0].date}
            className={`grid grid-rows-[auto_repeat(7,minmax(0,1fr))] gap-[3px] ${
              i < firstMobileWeek ? "hidden md:grid" : ""
            }`}
          >
            <span className="h-4 font-mono text-[10px] leading-4 text-on-surface-variant whitespace-nowrap overflow-visible">
              {labels[i]}
            </span>
            {week.days.map((day) => (
              <span
                key={day.date}
                title={`${day.date}: ${day.count} contributions`}
                className={`aspect-square rounded-[3px] ${LEVEL_CLASS[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Language mix and contribution calendar pulled from GitHub, as two cards for a two-column grid. */
export function GithubPanel({ stats }: { stats: GithubStats }) {
  return (
    <>
      {stats.languages.length > 0 ? (
        <Languages languages={stats.languages} />
      ) : null}
      <Calendar weeks={stats.weeks} total={stats.totalContributions} />
    </>
  );
}
