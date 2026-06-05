"use client";

import { motion } from "framer-motion";
import styles from "./Projects.module.css";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  thumbnailUrl?: string | null;
}

interface ProjectsProps {
  data: Project[];
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DEFAULT_PROJECTS: Project[] = [
  { id: 1, title: "Neural Network Viz", category: "Data Visualization", year: "2024" },
  { id: 2, title: "Quantum Ledger", category: "Fintech / Web3", year: "2024" },
  { id: 3, title: "Cyber-Security OS", category: "Security Tool", year: "2023" },
];

export default function Projects({ data }: ProjectsProps) {
  const projects = data.length > 0 ? data : DEFAULT_PROJECTS;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className={styles.sublabel}>03 — SELECTED WORKS</span>
          <h2 className={styles.title}>Projects</h2>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`/projects/${project.id}`}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
            >
              <div className={styles.thumbnail}>
                {project.thumbnailUrl && (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className={styles.thumbnailImg}
                  />
                )}
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardInfo}>
                  <span className={styles.projectName}>{project.title}</span>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>
                <span className={styles.projectYear}>{project.year}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
