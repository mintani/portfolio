import type { GithubStats, ContributionWeek } from "@/lib/github-stats";

/** Cell fill per contribution level, from empty to busiest. */
const LEVEL_CLASS = [
  "bg-ink/6",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
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
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
        Languages · 公開リポジトリの言語比率
      </p>
      <div className="flex h-3 gap-0.5 rounded-full overflow-hidden mt-3">
        {languages.map((lang) => (
          <span
            key={lang.name}
            style={{ flexGrow: lang.percent, backgroundColor: lang.color }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
        {languages.map((lang) => (
          <li key={lang.name} className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-ink">{lang.name}</span>
            <span className="font-mono text-xs text-ink-3 tabular-nums">
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
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
        Contributions · 直近 1 年で{" "}
        <span className="tabular-nums normal-case tracking-normal text-ink">
          {total.toLocaleString("en-US")}
        </span>
      </p>
      <div
        className="grid gap-[3px] mt-3 grid-cols-[repeat(var(--cols-mobile),minmax(0,1fr))] md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        style={gridStyle}
      >
        {weeks.map((week, i) => (
          <div
            key={week.days[0].date}
            className={`grid grid-rows-[auto_repeat(7,minmax(0,1fr))] gap-[3px] ${
              i < firstMobileWeek ? "hidden md:grid" : ""
            }`}
          >
            <span className="h-4 font-mono text-[10px] leading-4 text-ink-3 whitespace-nowrap overflow-visible">
              {labels[i]}
            </span>
            {week.days.map((day) => (
              <span
                key={day.date}
                title={`${day.date}: ${day.count} contributions`}
                className={`aspect-square rounded-[2px] ${LEVEL_CLASS[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Language mix and contribution calendar pulled from GitHub. */
export function GithubPanel({ stats }: { stats: GithubStats }) {
  return (
    <div className="flex flex-col gap-10">
      {stats.languages.length > 0 ? (
        <Languages languages={stats.languages} />
      ) : null}
      <Calendar weeks={stats.weeks} total={stats.totalContributions} />
    </div>
  );
}
