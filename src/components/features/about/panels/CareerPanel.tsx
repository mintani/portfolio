import { CAREER } from "@/data/about";

export function CareerPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative flex flex-col">
      {/* Vertical timeline line */}
      <div className="absolute left-20 top-2 bottom-2 w-px bg-linear-to-b from-yellow-400/80 via-yellow-400/30 to-transparent" />

      {CAREER.map((item, i) => (
        <div
          key={i}
          className={`group relative flex gap-0 ${compact ? "pb-5" : "pb-10"} last:pb-0`}
        >
          {/* Year */}
          <div className="w-20 shrink-0 pt-0.5">
            <span className="font-mono text-xs font-bold tracking-widest text-yellow-500">
              {item.year}
            </span>
          </div>

          {/* Dot */}
          <div className="absolute left-20 top-1.5 -translate-x-1/2 z-10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400/50 opacity-0 group-hover:opacity-75 duration-700" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400 ring-4 ring-white/80" />
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5 pl-8 transition-transform duration-300 group-hover:translate-x-1">
            <div className="flex flex-col gap-0.5">
              <span className="font-poppins text-sm font-bold text-neutral-800 leading-snug">
                {item.title}
              </span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                {item.place}
              </span>
            </div>
            {!compact ? (
              <p className="text-sm text-neutral-500 leading-relaxed">
                {item.desc}
              </p>
            ) : null}
            {item.tags && item.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-100/80 border border-yellow-300/60 text-yellow-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
