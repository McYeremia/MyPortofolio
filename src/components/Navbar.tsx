import { profile } from "@/content/portfolio";
import styles from "./Navbar.module.css";

const links = [
  { label: "home", href: "#top" },
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.pill}>
        <a href="#top" className={styles.brand}>
          {profile.initials}
        </a>
        <div className={styles.links}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className={styles.cta}>
          Get in touch <span className={styles.ctaArrow}>→</span>
        </a>
      </div>
    </nav>
  );
}
