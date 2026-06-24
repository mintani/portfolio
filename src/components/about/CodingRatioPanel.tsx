import type { ComponentType, CSSProperties } from "react";
import { MonitorSmartphone, Server, Cloud, Palette } from "lucide-react";
import { CODING_RATIO } from "@/data/about";
import type { CodingRatioItem } from "@/data/about";

type RatioIcon = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type RatioStyle = {
  readonly icon: RatioIcon;
  readonly bg: string;
  readonly border: string;
  readonly number: string;
  readonly iconText: string;
};

const RATIO_STYLES: Record<string, RatioStyle> = {
  Frontend: {
    icon: MonitorSmartphone,
    bg: "bg-gradient-to-br from-cyan-50 to-cyan-100/70",
    border: "border-cyan-200/60",
    number: "text-cyan-600",
    iconText: "text-cyan-500",
  },
  Backend: {
    icon: Server,
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/70",
    border: "border-emerald-200/60",
    number: "text-emerald-600",
    iconText: "text-emerald-500",
  },
  Infra: {
    icon: Cloud,
    bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/70",
    border: "border-indigo-200/60",
    number: "text-indigo-600",
    iconText: "text-indigo-500",
  },
  Design: {
    icon: Palette,
    bg: "bg-gradient-to-br from-violet-50 to-violet-100/70",
    border: "border-violet-200/60",
    number: "text-violet-600",
    iconText: "text-violet-500",
  },
};

const TOTAL = CODING_RATIO.reduce((sum, item) => sum + item.weight, 0);

// Largest share first, so it anchors the left column of the treemap.
const ITEMS = [...CODING_RATIO].sort((a, b) => b.weight - a.weight);
const [LEAD, ...REST] = ITEMS;

// Number shrinks with the share, echoing each tile's size.
const NUMBER_SIZE = ["text-4xl", "text-3xl", "text-2xl", "text-xl"];

// Oversized watermark icon per rank; about 20% bleeds off the right edge.
const ICON_SIZE = [180, 132, 104, 76];

function Tile({
  item,
  rank,
  className = "",
  style,
}: {
  item: CodingRatioItem;
  rank: number;
  className?: string;
  style?: CSSProperties;
}) {
  const s = RATIO_STYLES[item.label];
  const Icon = s.icon;
  const percent = Math.round((item.weight / TOTAL) * 100);
  return (
    <div
      className={`relative flex flex-col justify-center rounded-2xl p-3 border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${s.bg} ${s.border} ${className}`}
      style={style}
    >
      <Icon
        size={ICON_SIZE[rank]}
        strokeWidth={1.5}
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] ${s.iconText} opacity-20`}
      />
      <div className="relative z-10">
        <div className={`flex items-baseline gap-0.5 ${s.number}`}>
          <span
            className={`font-poppins font-bold leading-none ${NUMBER_SIZE[rank]}`}
          >
            {percent}
          </span>
          <span className="font-poppins font-bold text-sm">%</span>
        </div>
        <span className="mt-0.5 block font-mono text-[10px] tracking-wide text-neutral-500">
          {item.label}
        </span>
      </div>
    </div>
  );
}

export function CodingRatioPanel() {
  return (
    <div className="flex flex-col flex-1">
      <p className="font-mono text-[11px] text-neutral-400 mb-5">
        個人開発の比率
      </p>
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[560px] h-[440px] mx-auto flex gap-2">
          <Tile
            item={LEAD}
            rank={0}
            className="h-full"
            style={{ width: `${(LEAD.weight / TOTAL) * 100}%` }}
          />
          <div className="flex flex-1 flex-col gap-2">
            {REST.map((item, i) => (
              <Tile
                key={item.label}
                item={item}
                rank={i + 1}
                style={{ flexGrow: item.weight, flexBasis: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
