import Link from "next/link";
import { projects, allProjectsUrl } from "@/content/portfolio";
import { Media, TechRow, Actions, ProjectGridCard } from "./projectParts";
import styles from "./Projects.module.css";

export default function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.header}>
        <span className={styles.kicker}>Selected work</span>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.intro}>
          A few things I&apos;ve designed and built, end to end.
        </p>
      </div>

      {featured ? (
        <article className={styles.featured}>
          <div className={styles.featuredMedia}>
            <Media project={featured} />
            <span className={styles.featuredBadge}>Featured</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.tag}>{featured.tag}</div>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredDesc}>{featured.desc}</p>
            <TechRow tech={featured.tech} />
            <Actions project={featured} />
          </div>
        </article>
      ) : null}

      <div className={styles.grid}>
        {rest.map((p) => (
          <ProjectGridCard key={p.title} project={p} />
        ))}
      </div>

      <div className={styles.allWrap}>
        <Link href={allProjectsUrl} className={styles.allBtn}>
          See all projects
          <span className={styles.allArrow}>→</span>
        </Link>
      </div>
    </section>
  );
}
