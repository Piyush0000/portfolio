import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Flagship from "@/components/sections/Flagship";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { getGitHubActivity } from "@/lib/github";
import { site } from "@/data/site";

export const revalidate = 3600;

export default async function Home() {
  const github = await getGitHubActivity(site.githubUser);
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Flagship />
        <Projects />
        <Experience />
        <Skills />
        <GitHubActivity data={github} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
