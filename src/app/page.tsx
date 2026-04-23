import { HeroSection } from "./_components/HeroSection";
import { AboutSection } from "./_components/AboutSection";
import { WorksSection } from "./_components/WorksSection";
import { SiteFooter } from "./_components/Footer";
import { getArticlesList } from "@/lib/github-blog";
import { BLOG_CONFIG } from "@/lib/blog-config";
import { getRequestOrigin } from "@/lib/request-origin";

export default async function Home() {
  const githubToken = process.env.GITHUB_TOKEN;
  const baseUrl = await getRequestOrigin();

  const articles = githubToken
    ? await getArticlesList({
        owner: BLOG_CONFIG.OWNER,
        repo: BLOG_CONFIG.REPO,
        articlesDir: BLOG_CONFIG.ARTICLES_DIR,
        githubToken,
        baseUrl,
      }).catch(() => [])
    : [];

  return (
    <div className="w-full bg-[#ceefee] relative flex flex-col items-center overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <WorksSection articles={articles} />
      <SiteFooter />
    </div>
  );
}
