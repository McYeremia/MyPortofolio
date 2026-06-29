import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/portfolio";
import AmbientBackground from "@/components/AmbientBackground";
import { ProjectGridCard } from "@/components/projectParts";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects — Yeremia Christopher Wicaksana",
  description:
    "Every project Yeremia (Jerry) has designed and built, end to end.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <AmbientBackground />
      <div className={styles.inner}>
        <Link href="/#projects" className={styles.back}>
          <span className={styles.backArrow} aria-hidden="true">‹</span> Back to home
        </Link>

        <header className={styles.head}>
          <span className={styles.kicker}>Archive</span>
          <h1 className={styles.title}>All projects</h1>
          <p className={styles.intro}>
            Everything I&apos;ve built and shipped — from frontend interfaces to
            the APIs and contracts behind them.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectGridCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
