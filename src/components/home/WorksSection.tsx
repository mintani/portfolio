import { ArrowUpRight, Settings, Terminal, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { WorkItem } from "@/data/about";
import { WORKS } from "@/data/about";
import { BLOG_CONFIG } from "@/lib/blog-config";
import type { BlogArticleMeta } from "@/lib/github-blog";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

/** Letters shown instead of a screenshot: short titles keep all of them. */
function initials(title: string) {
  return title.length <= 6 ? title : title.slice(0, 2);
}

function WorkCard({ work }: { work: WorkItem }) {
  return (
    <a
      href={work.url ?? "#"}
      {...EXTERNAL_LINK_PROPS}
      className={`group grid gap-3 min-w-0 ${FOCUS_RING}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-rule bg-paper-2">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-[420ms] ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span
              aria-hidden
              className="hero-outline-text stroke-periwinkle select-none text-6xl"
            >
              {initials(work.title)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
        <span>{work.type === "hackathon" ? "Hackathon" : "Project"}</span>
        {work.award ? (
          <span className="inline-flex items-center gap-1 normal-case tracking-normal text-accent">
            <Trophy size={11} />
            {work.award}
          </span>
        ) : null}
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-bold text-lg leading-snug text-ink">
          {work.title}
        </h3>
        <ArrowUpRight
          size={16}
          className="shrink-0 mt-1 text-ink-3 group-hover:text-ink transition-colors duration-200"
        />
      </div>

      <p className="text-sm text-ink-2 leading-relaxed line-clamp-3">
        {work.desc}
      </p>

      <p className="font-mono text-xs text-ink-3 mt-1">
        {work.tags.join(" · ")}
      </p>
    </a>
  );
}

function BlogRow({ article }: { article: BlogArticleMeta }) {
  return (
    <li>
      <Link
        href={`/blog/${article.slug}`}
        className={`group grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[7rem_minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4 ${FOCUS_RING}`}
      >
        <span className="col-span-2 sm:col-span-1 font-mono text-xs text-ink-3 tabular-nums">
          {article.date ? article.date.slice(0, 10) : ""}
        </span>
        <span className="min-w-0">
          <span className="block font-display font-semibold text-base sm:text-lg text-ink leading-snug group-hover:underline underline-offset-4 decoration-accent decoration-1">
            {article.title}
          </span>
          {article.description ? (
            <span className="text-sm text-ink-2 line-clamp-1 mt-0.5">
              {article.description}
            </span>
          ) : null}
        </span>
        <span className="flex items-center gap-1.5 text-ink-3">
          {article.readingTime ? (
            <span className="font-mono text-xs whitespace-nowrap">
              {article.readingTime}
            </span>
          ) : null}
          <ArrowUpRight size={14} className="shrink-0" />
        </span>
      </Link>
    </li>
  );
}

/** Works section: project grid plus the latest blog posts as a ruled list. */
export function WorksSection({ articles }: { articles: BlogArticleMeta[] }) {
  return (
    <section
      id="works-section"
      className="w-full relative overflow-hidden bg-paper py-20 lg:py-28"
    >
      {/* Background decoration, continuing the About section's alternation */}
      <Terminal
        aria-hidden
        strokeWidth={0.5}
        className="pointer-events-none absolute z-0 -top-[10vw] -right-[14vw] size-[52vw] lg:size-[36rem] lg:-top-32 lg:-right-36 rotate-[10deg] text-accent opacity-[0.1]"
      />
      <Settings
        aria-hidden
        strokeWidth={0.6}
        className="pointer-events-none absolute z-0 -bottom-[14vw] -left-[12vw] size-[56vw] lg:size-[40rem] lg:-bottom-56 lg:-left-40 -rotate-[18deg] text-ink-2 opacity-[0.14]"
      />

      <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeading
          title="Works"
          lede="ハッカソンで作ったものと、個人で開発しているものです。"
        />
        <div className="border-t border-rule mt-10" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-10">
          {WORKS.map((work) => (
            <li key={work.title} className="min-w-0">
              <WorkCard work={work} />
            </li>
          ))}
        </ul>

        {articles.length > 0 ? (
          <div className="mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em] text-ink">
                Blog
              </h3>
              <a
                href={BLOG_CONFIG.SITE_URL}
                {...EXTERNAL_LINK_PROPS}
                className={`inline-flex items-center gap-1 text-sm text-ink-2 hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-accent whitespace-nowrap ${FOCUS_RING}`}
              >
                すべて見る
                <ArrowUpRight size={14} />
              </a>
            </div>
            <ol className="divide-y divide-rule">
              {articles.slice(0, 3).map((article) => (
                <BlogRow key={article.slug} article={article} />
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}
