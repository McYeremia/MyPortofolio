import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export const revalidate = 0;

export default async function Home() {
  const [about, projects] = await Promise.all([
    prisma.about.findFirst({ where: { id: 1 } }).catch(() => null),
    prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);

  const aboutData = about
    ? {
        bio: about.bio,
        skills: about.skills,
        stats: about.stats as { value: string; label: string }[],
      }
    : null;

  return (
    <main>
      <Hero />
      <About data={aboutData} />
      <Projects data={projects} />
      <Contact />
    </main>
  );
}
