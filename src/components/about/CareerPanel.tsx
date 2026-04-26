import { CAREER } from "@/data/about";

export function CareerPanel() {
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-300/70 via-cyan-200/40 to-transparent" />

      {CAREER.map((item) => (
        <div key={item.year} className="relative flex gap-5 pb-8 last:pb-0">
          <div className="shrink-0 mt-1.5 z-10">
            <div className="size-[11px] rounded-full border-2 border-cyan-400 bg-white shadow-sm" />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0 -mt-0.5">
            <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
              {item.year}
            </span>
            <span className="font-semibold text-sm text-neutral-800 leading-snug">
              {item.title}
            </span>
            <span className="text-[11px] text-neutral-400">{item.place}</span>
            {item.desc ? (
              <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                {item.desc}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
