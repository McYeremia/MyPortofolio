import { skills } from "@/content/portfolio";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.title}>Familiar tools</h2>
      <p className={styles.intro}>
        Technologies I use across the frontend, backend, and Web3.
      </p>
      <div className={styles.grid}>
        {skills.map((cat) => (
          <div key={cat.title} className={styles.card}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
