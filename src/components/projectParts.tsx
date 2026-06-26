import { type ProjectCard } from "@/content/portfolio";
import TiltCard from "./TiltCard";
import styles from "./Projects.module.css";

export function Media({ project }: { project: ProjectCard }) {
  return (
    <div className={styles.media}>
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt={project.title} className={styles.shot} />
      ) : (
        <span className={styles.thumbLabel}>{project.thumb}</span>
      )}
    </div>
  );
}

export function TechRow({ tech }: { tech: string[] }) {
  return (
    <ul className={styles.techRow}>
      {tech.map((t) => (
        <li key={t} className={styles.techBadge}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Actions({ project }: { project: ProjectCard }) {
  return (
    <div className={styles.actions}>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnLive}
        >
          Live <span className={styles.mono}>↗</span>
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnCode}
        >
          Code
        </a>
      ) : null}
    </div>
  );
}

/** A single project rendered as a tilt-on-hover grid card. */
export function ProjectGridCard({ project }: { project: ProjectCard }) {
  return (
    <TiltCard className={styles.card}>
      <Media project={project} />
      <div className={styles.cardBody}>
        <div className={styles.tag}>{project.tag}</div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <TechRow tech={project.tech} />
        <Actions project={project} />
      </div>
    </TiltCard>
  );
}
