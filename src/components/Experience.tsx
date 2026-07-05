"use client";

import { useEffect, useRef } from "react";
import { experiences } from "@/content/portfolio";
import styles from "./Experience.module.css";

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Reveal each entry as it scrolls into view, and let the timeline line
     "fill" once the section is in frame. Matches the site's IntersectionObserver
     approach and respects prefers-reduced-motion via the global CSS reset. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(`.${styles.entry}`),
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );

    items.forEach((el) => io.observe(el));

    // Fill the timeline line once the track itself enters view.
    const line = root.querySelector<HTMLElement>(`.${styles.line}`);
    let lineIo: IntersectionObserver | null = null;
    if (line) {
      lineIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add(styles.lineFilled);
              lineIo?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -20% 0px", threshold: 0.1 },
      );
      lineIo.observe(line);
    }

    return () => {
      io.disconnect();
      lineIo?.disconnect();
    };
  }, []);

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.header}>
        <span className={styles.kicker}>Beyond the code</span>
        <h2 className={styles.title}>Organizational experience</h2>
        <p className={styles.intro}>
          Where I led, organized, and worked with people during my time on campus.
        </p>
      </div>

      <div ref={rootRef} className={styles.timeline}>
        <span className={styles.line} aria-hidden="true" />

        {experiences.map((exp, i) => (
          <article
            key={`${exp.year}-${exp.role}`}
            className={styles.entry}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className={styles.node} aria-hidden="true">
              <span className={styles.nodeDot} />
            </div>

            <div className={styles.card}>
              <span className={styles.year}>{exp.year}</span>
              <h3 className={styles.role}>{exp.role}</h3>
              <p className={styles.org}>{exp.org}</p>
              {exp.description ? (
                <p className={styles.desc}>{exp.description}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
