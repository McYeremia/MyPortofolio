import styles from "./AmbientBackground.module.css";

export default function AmbientBackground() {
  return (
    <>
      <div className={styles.blobs} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blobOne}`} />
        <div className={`${styles.blob} ${styles.blobTwo}`} />
        <div className={`${styles.blob} ${styles.blobThree}`} />
      </div>
      <div className={styles.grid} aria-hidden="true" />
    </>
  );
}
