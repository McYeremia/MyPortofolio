import { projects, allProjectsUrl } from "@/content/portfolio";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Latest projects</h2>
          <p className={styles.intro}>Some of the most recent things I&apos;ve built.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.thumb}>
              <span className={styles.thumbLabel}>{p.thumb}</span>
            </div>
            <div className={styles.cardBody}>
              <div>
                <div className={styles.tag}>{p.tag}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.allWrap}>
        <a
          href={allProjectsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.allBtn}
        >
          See all projects
          <span className={styles.allArrow}>→</span>
        </a>
      </div>
    </section>
  );
}
