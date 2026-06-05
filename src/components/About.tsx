"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

interface Stat {
  value: string;
  label: string;
}

interface AboutData {
  bio: string;
  skills: string[];
  stats: Stat[];
}

interface AboutProps {
  data: AboutData | null;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DEFAULT_DATA: AboutData = {
  bio: "Deeply immersed in software development since 2018. I build scalable, maintainable systems with a focus on clean architecture and engineering discipline.",
  skills: ["Next.js", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
  stats: [
    { value: "50+", label: "Deployments" },
    { value: "10+", label: "Regions" },
    { value: "99.9%", label: "Uptime" },
  ],
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: EASE },
};

export default function About({ data }: AboutProps) {
  const { bio, skills, stats } = data ?? DEFAULT_DATA;
  const safeStats = stats as Stat[];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...fadeUp}>
          <span className={styles.sublabel}>02 — ABOUT</span>
          <h2 className={styles.title}>Who I Am</h2>
        </motion.div>

        <motion.div
          className={styles.body}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        >
          <p className={styles.bio}>{bio}</p>

          <div className={styles.stats}>
            {safeStats.map(({ value, label }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.skills}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
        >
          <span className={styles.skillsLabel}>TECH STACK</span>
          <div className={styles.skillGrid}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skillBadge}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
