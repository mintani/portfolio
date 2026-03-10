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
      <div className="hidden lg:block">
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-[minmax(0,1fr)_14rem] gap-10">
            <main className="min-w-0">
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

      <main className="mx-auto max-w-2xl lg:hidden">
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </>
  );
};
