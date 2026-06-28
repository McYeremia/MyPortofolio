"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/content/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const wrap = wrapRef.current;
    if (!hero || !wrap) return;
    // Skip the parallax on touch / coarse pointers and reduced motion.
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const apply = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      const px = (lastX - r.left) / r.width - 0.5;
      const py = (lastY - r.top) / r.height - 0.5;
      wrap.style.transform = `rotateX(${-py * 20}deg) rotateY(${px * 20}deg)`;
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      wrap.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  return (
    <section ref={heroRef} id="top" className={styles.hero}>
      <div className={styles.intro}>
        <h1 className={styles.title}>
          <span className={styles.greeting}>Hi, I&apos;m</span>
          {profile.name}
        </h1>
        <p className={styles.subtitle}>
          or just call me{" "}
          <span className={styles.accent}>{profile.nickname}</span>
        </p>
        <p className={styles.lead}>
          I&apos;m focusing on{" "}
          <span className={styles.accent}>{profile.focus}</span>, building things
          end to end while exploring Web3 and decentralized apps.
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={styles.btnPrimary}>
            View Projects <span className={styles.mono}>↗</span>
          </a>
          <a href="#contact" className={styles.btnGlass}>
            Get in touch <span className={styles.mono}>→</span>
          </a>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.visualGlow} aria-hidden="true" />
        <div className={styles.perspective}>
          <div ref={wrapRef} className={styles.wrap}>
            <div className={`${styles.sheet} ${styles.sheetLeft}`}>
              <div className={styles.sheetInner}>
                {profile.heroSidePhotos?.[0] ? (
                  <img
                    src={profile.heroSidePhotos[0]}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.sheetPhoto} ${styles.sheetPhotoLeft}`}
                  />
                ) : null}
              </div>
            </div>
            <div className={`${styles.sheet} ${styles.sheetRight}`}>
              <div className={styles.sheetInner}>
                {profile.heroSidePhotos?.[1] ? (
                  <img
                    src={profile.heroSidePhotos[1]}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.sheetPhoto} ${styles.sheetPhotoRight}`}
                  />
                ) : null}
              </div>
            </div>
            <div className={styles.cardCenter}>
              <div className={styles.card}>
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.photoPlaceholder}>Drop your photo</div>
                )}
                <div className={styles.cardSheen} aria-hidden="true" />
                <div className={styles.cardOverlay} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.chip} ${styles.chipTL}`}>&lt;/&gt; Frontend</div>
        <div className={`${styles.chip} ${styles.chipTR} ${styles.chipAccent}`}>
          ⬡ Web3
        </div>
        <div className={`${styles.chip} ${styles.chipBL} ${styles.chipAccent}`}>
          {"{ }"} Fullstack
        </div>
        <div className={`${styles.chip} ${styles.chipBR}`}>⌗ Backend</div>
      </div>
    </section>
  );
}
