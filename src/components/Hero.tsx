"use client";

import styles from './Hero.module.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.subtitle}>System Initialized</h2>
          <h1 className={styles.title}>
            Building the <span className={styles.highlight}>Future</span> of Web
          </h1>
          <p className={styles.description}>
            I am a Fullstack Developer specializing in high-performance, 
            visually stunning digital experiences. Transforming complex 
            ideas into sleek, futuristic reality.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Initialize Project</button>
            <button className={styles.secondaryBtn}>View Archive</button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.orb}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring2}></div>
        </motion.div>
      </div>
      
      <div className={styles.scanline}></div>
    </section>
  );
};

export default Hero;
