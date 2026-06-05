"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: EASE },
});

const Contact = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...fadeUp()}>
          <span className={styles.sublabel}>04 — CONTACT</span>
          <h2 className={styles.title}>Get in Touch</h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div className={styles.info} {...fadeUp(0.1)}>
            <p className={styles.infoDesc}>
              Open to freelance work, full-time positions, or technical
              consulting. Let&apos;s build something great together.
            </p>
            <a
              href="mailto:yeremia.christopher@gmail.com"
              className={styles.email}
            >
              yeremia.christopher@gmail.com
            </a>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
            {...fadeUp(0.2)}
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">NAME</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message"
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </motion.form>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 Yeremia. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
