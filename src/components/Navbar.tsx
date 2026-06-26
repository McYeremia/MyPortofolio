"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { profile } from "@/content/portfolio";
import styles from "./Navbar.module.css";

const links = [
  { label: "HOME", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
];

export default function Navbar() {
  const [active, setActive] = useState("#top");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkEls = useRef<(HTMLAnchorElement | null)[]>([]);

  /* Slide the glass indicator to whichever link is active */
  const moveIndicator = useCallback(() => {
    const container = linksRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    // Hide indicator on mobile (links container hidden)
    if (container.offsetParent === null) {
      indicator.style.opacity = "0";
      return;
    }

    const idx = links.findIndex((l) => l.href === active);
    const el = linkEls.current[idx];
    if (!el) return;

    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();

    indicator.style.width = `${eRect.width}px`;
    indicator.style.height = `${eRect.height}px`;
    indicator.style.transform = `translateX(${eRect.left - cRect.left}px)`;
    indicator.style.opacity = "1";
  }, [active]);

  useEffect(() => {
    moveIndicator();
  }, [moveIndicator]);

  /* Recalc on resize */
  useEffect(() => {
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  /* Track which section is in view */
  useEffect(() => {
    const ids = ["top", "about", "skills", "projects", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id;
            if (id === "skills") setActive("#about");
            else if (id === "contact") setActive("#contact");
            else setActive(`#${id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Shrink effect on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on scroll */
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.pill}>
        <a href="#top" className={styles.brand}>
          {profile.initials}
        </a>

        {/* Desktop links */}
        <div ref={linksRef} className={styles.links}>
          <div ref={indicatorRef} className={styles.indicator} aria-hidden />
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => { linkEls.current[i] = el; }}
              className={`${styles.link} ${active === link.href ? styles.linkActive : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.linkText}>{link.label}</span>
            </a>
          ))}
        </div>

        <a href="#contact" className={styles.cta}>
          <span className={styles.ctaLabel}>Get in touch</span>
          <span className={styles.ctaArrow}>→</span>
        </a>

        {/* Hamburger button (mobile only) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`${styles.mobileLink} ${active === link.href ? styles.mobileLinkActive : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className={styles.mobileCta}
          onClick={() => setMenuOpen(false)}
        >
          Get in touch <span className={styles.ctaArrow}>→</span>
        </a>
      </div>
    </nav>
  );
}
