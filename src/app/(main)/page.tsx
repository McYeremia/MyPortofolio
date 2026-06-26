import AmbientBackground from "@/components/AmbientBackground";
import ParticleLines from "@/components/ParticleLines";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <AmbientBackground />
      <ParticleLines />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
