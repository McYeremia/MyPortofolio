import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { about, projects } from "@/content/portfolio";

export default function Home() {
  return (
    <main>
      <Hero />
      <About data={about} />
      <Projects data={projects} />
      <Contact />
    </main>
  );
}
