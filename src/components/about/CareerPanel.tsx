import { Chip } from "@/components/shared/Chip";
import { CAREER } from "@/data/about";

// The data is newest first; the stepper reads oldest first.
const STEPS = [...CAREER].reverse();

/**
 * Career as a Material stepper: numbered markers joined by a connector. Vertical on
 * phones, horizontal from md up. The last (current) step wears a halo.
 */
export function CareerPanel() {
  return (
    <div>
      <h3 className="text-2xl font-medium text-on-surface sm:text-[28px]">
        Career
      </h3>
      <ol className="mt-6 grid grid-cols-1 md:grid-cols-3">
        {STEPS.map((item, index) => (
          <li
            key={item.year}
            className="group grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] content-start gap-x-4 md:grid-cols-1"
          >
            <div className="flex flex-col items-center md:flex-row">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-on-primary tabular-nums group-last:ring-4 group-last:ring-primary-container">
                {index + 1}
              </span>
              <span
                aria-hidden
                className="my-2 w-px flex-1 bg-outline-variant group-last:hidden md:mx-3 md:my-0 md:h-px md:w-auto"
              />
            </div>
            <div className="pb-8 md:pt-4 md:pr-8 md:pb-0">
              <span className="block text-2xl font-medium whitespace-nowrap text-on-surface tabular-nums">
                {item.year}
              </span>
              <h4 className="mt-1 text-base font-medium text-on-surface">
                {item.title}
              </h4>
              <p className="text-sm text-on-surface-variant">{item.place}</p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {item.desc}
              </p>
              {item.tags.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Chip>{tag}</Chip>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
