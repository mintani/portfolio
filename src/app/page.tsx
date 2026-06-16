import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WorksSection } from "@/components/home/WorksSection";
import { SiteFooter } from "@/components/layout/Footer";
import { getArticlesList } from "@/lib/github-blog";
import { getRequestOrigin } from "@/lib/request-origin";

export default async function Home() {
  const githubToken = process.env.GITHUB_TOKEN;
  const baseUrl = await getRequestOrigin();

  const articles = githubToken
    ? await getArticlesList({ baseUrl }).catch(() => [])
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
