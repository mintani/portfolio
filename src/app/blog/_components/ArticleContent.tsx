import { ArticleToc } from "@/app/blog/_components/ArticleToc";
import type { TocItem } from "@/lib/markdown";

type ArticleContentProps = {
  htmlContent: string;
  toc: TocItem[];
};

export const ArticleContent = ({ htmlContent, toc }: ArticleContentProps) => {
  const hasTableOfContents = toc.length > 0;

  return (
    <>
      {/* Desktop layout with TOC sidebar */}
      <div className="hidden lg:block">
        <div className="relative mx-auto max-w-5xl">
          <div className="flex gap-10">
            <main className="min-w-0 flex-1">
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </main>
            {hasTableOfContents ? (
              <aside className="relative w-56 shrink-0">
                <ArticleToc items={toc} />
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <main className="mx-auto max-w-2xl lg:hidden">
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </>
  );
};
