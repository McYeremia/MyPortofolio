import { skills } from "@/content/portfolio";
import TiltCard from "./TiltCard";
import styles from "./Skills.module.css";

/** Decorative tool logos that float around the cards. */
const floatLogos: { name: string; src: string }[] = [
  { name: "React", src: "/logos/react.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "Python", src: "/logos/python.svg" },
  { name: "PHP", src: "/logos/php.svg" },
  { name: "Solidity", src: "/logos/solidity.svg" },
  { name: "MetaMask", src: "/logos/metamask.svg" },
  { name: "GitHub", src: "/logos/github.svg" },
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
];

// Each logo sits near its category card. Grid is 2×2:
//   Frontend (top-left)  Backend (top-right)
//   Web3 (bottom-left)   Tools (bottom-right)
// Order below matches floatLogos.
const positions: {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}[] = [
  // Frontend → top-left
  { left: "6%", top: "2px" }, // React
  { left: "22%", top: "2px" }, // TypeScript
  { left: "2px", top: "22%" }, // JavaScript
  // Backend → top-right
  { left: "78%", top: "2px" }, // Python
  { right: "2px", top: "18%" }, // PHP
  // Web3 → bottom-left
  { left: "2px", top: "70%" }, // Solidity
  { left: "8%", bottom: "2px" }, // MetaMask
  // Tools → bottom-right
  { left: "64%", bottom: "2px" }, // GitHub
  { left: "84%", bottom: "2px" }, // Figma
  { right: "2px", top: "74%" }, // Claude
];

const drifts = [styles.driftA, styles.driftB, styles.driftC, styles.driftD];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.title}>Familiar tools</h2>
      <p className={styles.intro}>
        Technologies I use across the frontend, backend, and Web3.
      </p>

      <div className={styles.board}>
        <div className={styles.logoLayer} aria-hidden="true">
          {floatLogos.map((l, i) => (
            <span
              key={l.name}
              className={`${styles.logoChip} ${drifts[i % drifts.length]}`}
              title={l.name}
              style={{
                left: positions[i].left,
                right: positions[i].right,
                top: positions[i].top,
                bottom: positions[i].bottom,
                animationDuration: `${9 + (i % 4)}s`,
                animationDelay: `${-(i * 0.8).toFixed(1)}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt="" />
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {skills.map((cat) => (
            <TiltCard key={cat.title} className={styles.card}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <span className={styles.cardTag}>{cat.tag}</span>
              </div>
              <div className={styles.items}>
                {cat.items.map((item) => (
                  <span key={item} className={styles.item}>
                    <span className={styles.dot} />
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
