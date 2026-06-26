import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <AmbientBackground />
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The page you&apos;re looking for drifted off into the glass. Let&apos;s
          get you back.
        </p>
        <Link href="/" className={styles.btn}>
          Back home <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </main>
  );
}
