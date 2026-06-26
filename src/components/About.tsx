import { about } from "@/content/portfolio";
import styles from "./About.module.css";

/** Splits text on the highlight word and renders matches in the accent color. */
function highlight(text: string, word: string) {
  if (!word) return text;
  const parts = text.split(word);
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <span key={i} className={styles.accent}>{word}</span>]
      : [part]
  );
}

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.title}>About me</h2>
      <p className={styles.intro}>{about.intro}</p>
      <div className={styles.card}>
        <p className={styles.body}>
          {highlight(about.body, about.highlight)}
        </p>
      </div>
    </section>
  );
}
