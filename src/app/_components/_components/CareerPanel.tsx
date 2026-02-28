import { CAREER } from "@/data/about";

export function CareerPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col divide-y divide-white/40">
      {CAREER.map((item) => (
        <div
          key={item.year}
          className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0"
        >
          {/* Year pill */}
          <div className="shrink-0 mt-0.5">
            <span className="inline-block font-mono text-[11px] font-bold tracking-widest text-yellow-600 bg-yellow-50 border border-yellow-200/80 px-2.5 py-1 rounded-md">
              {item.year}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="font-semibold text-sm text-neutral-800 leading-snug">
              {item.title}
            </span>
            <span className="text-[11px] text-neutral-400">{item.place}</span>
            {item.desc && !compact && (
              <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                {item.desc}
              </p>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100/80 border border-neutral-200/60 text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
