"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.cyan}>J</span>ERRY<span className={styles.dot}>.</span>
        </Link>
        <div className={styles.links}>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#projects" className={styles.link}>Projects</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
