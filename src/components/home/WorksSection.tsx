import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/shared/Chip";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { WorkItem } from "@/data/about";
import { WORKS } from "@/data/about";
import { BLOG_CONFIG } from "@/lib/blog-config";
import type { BlogArticleMeta } from "@/lib/github-blog";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

/** Letters shown instead of a screenshot: short titles keep all of them. */
function initials(title: string) {
  return title.length <= 6 ? title : title.slice(0, 2);
}

/** Elevated card with inset media and the award chip laid over it; the whole card is the link. */
function WorkCard({ work }: { work: WorkItem }) {
  return (
    <a
      href={work.url ?? "#"}
      {...EXTERNAL_LINK_PROPS}
      className="state-layer group flex h-full flex-col rounded-3xl bg-surface-container-lowest text-on-surface shadow-level-1 transition-shadow duration-200 hover:shadow-level-3"
    >
      <div className="relative m-2 mb-0 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-emphasized group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              aria-hidden
              className="hero-ghost-text select-none text-6xl text-primary-fixed-dim"
            >
              {initials(work.title)}
            </span>
          </div>
        )}
        {work.award ? (
          <Chip className="absolute top-2 left-2 border-transparent bg-tertiary-container text-on-tertiary-container shadow-level-1">
            <Trophy size={12} />
            {work.award}
          </Chip>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-medium text-primary">
          {work.type === "hackathon" ? "Hackathon" : "Project"}
        </span>

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl leading-snug font-medium">{work.title}</h3>
          <ArrowUpRight
            size={20}
            className="mt-0.5 shrink-0 text-on-surface-variant"
          />
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
          {work.desc}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {work.tags.map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

/** Two-line list item: tonal leading icon, date over title, one line of description. */
function BlogRow({ article }: { article: BlogArticleMeta }) {
  return (
    <li>
      <Link
        href={`/blog/${article.slug}`}
        className="state-layer flex items-center gap-4 rounded-[20px] px-3 py-3 text-on-surface sm:px-4"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
          <FileText size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-xs text-on-surface-variant tabular-nums">
            {article.date ? article.date.slice(0, 10) : ""}
          </span>
          <span className="block text-base leading-snug font-medium">
            {article.title}
          </span>
          {article.description ? (
            <span className="mt-0.5 block truncate text-sm text-on-surface-variant">
              {article.description}
            </span>
          ) : null}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-on-surface-variant">
          {article.readingTime ? (
            <span className="hidden text-xs whitespace-nowrap sm:inline">
              {article.readingTime}
            </span>
          ) : null}
          <ChevronRight size={20} />
        </span>
      </Link>
    </li>
  );
}

/** Works section: a tonal panel with project cards and the latest blog posts as a list. */
export function WorksSection({ articles }: { articles: BlogArticleMeta[] }) {
  return (
    <section id="works-section" className="w-full px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[28px] bg-surface-container-low py-16 sm:rounded-[48px] lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title="Works"
            icon={BriefcaseBusiness}
            lede="ハッカソンで作ったものと、個人で開発しているものです。"
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS.map((work) => (
              <li key={work.title} className="min-w-0">
                <WorkCard work={work} />
              </li>
            ))}
          </ul>

          {articles.length > 0 ? (
            <div className="mt-14 rounded-[28px] bg-surface-container-lowest p-2 sm:p-3">
              <div className="flex items-center justify-between gap-4 pt-2 pr-1 pb-2 pl-4">
                <h3 className="text-2xl font-medium text-on-surface">Blog</h3>
                <a
                  href={BLOG_CONFIG.SITE_URL}
                  {...EXTERNAL_LINK_PROPS}
                  className="state-layer inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium text-primary"
                >
                  すべて見る
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <ol className="flex flex-col gap-1">
                {articles.slice(0, 3).map((article) => (
                  <BlogRow key={article.slug} article={article} />
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
