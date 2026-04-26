import { ArrowUpRight } from "lucide-react";
import type { BlogArticleMeta } from "@/lib/github-blog";
import { WORKS } from "@/data/about";
import { BLOG_CONFIG } from "@/lib/blog-config";

function WorkCard({ work }: { work: (typeof WORKS)[number] }) {
  return (
    <a
      href={work.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden bg-white/50 border border-white/60 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
    >
      <div
        className="relative h-28 flex items-end p-4"
        style={{
          background: `linear-gradient(135deg, ${work.colorFrom}, ${work.colorTo})`,
        }}
      >
        {work.award && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-white/25 text-white border border-white/30 backdrop-blur-sm">
            🏆 {work.award}
          </span>
        )}
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 border border-white/30 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
          {work.type === "hackathon" ? "Hackathon" : "Project"}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-poppins font-bold text-[15px] text-neutral-800 leading-snug">
            {work.title}
          </h3>
          <ArrowUpRight
            size={15}
            className="shrink-0 text-neutral-300 group-hover:text-neutral-600 transition-colors mt-0.5"
          />
        </div>
        <p className="text-sm text-neutral-500 leading-relaxed flex-1">
          {work.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/60 text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function BlogCard({ article }: { article: BlogArticleMeta }) {
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white/50 border border-white/60 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
    >
      <div
        className="relative h-28 flex items-end p-4"
        style={{ background: "linear-gradient(135deg, #f59e0b, #b45309)" }}
      >
        {article.date && (
          <span className="absolute top-3 right-3 text-[10px] font-mono text-white/60">
            {article.date.slice(0, 7)}
          </span>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 border border-white/30 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
            Blog
          </span>
          {article.readingTime && (
            <span className="text-[10px] font-mono text-white/60">
              {article.readingTime}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-poppins font-bold text-[15px] text-neutral-800 leading-snug line-clamp-2">
            {article.title}
          </h3>
          <ArrowUpRight
            size={15}
            className="shrink-0 text-neutral-300 group-hover:text-neutral-600 transition-colors mt-0.5"
          />
        </div>
        {article.description && (
          <p className="text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-2">
            {article.description}
          </p>
        )}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export function WorksSection({ articles }: { articles: BlogArticleMeta[] }) {
  return (
    <section
      id="works-section"
      className="w-full relative z-30 overflow-hidden flex flex-col items-center bg-[#ceefee]"
    >
      <div className="container mx-auto w-full py-20 px-4 sm:px-6 lg:px-10 flex flex-col gap-10">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-cyan-500/70">
            制作物 & 記事
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold font-poppins italic text-neutral-800 leading-none">
            Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKS.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </div>

        {articles.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 rounded-full bg-amber-400/70" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                  Blog
                </span>
              </div>
              <a
                href={BLOG_CONFIG.SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                すべて見る
                <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.slice(0, 3).map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
