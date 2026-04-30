"use client";

import styles from './About.module.css';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    "Next.js", "TypeScript", "React", "Node.js", 
    "Python", "PostgreSQL", "Docker", "AWS"
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>About <span className="neon-text">Me</span></h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.textSide}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className={styles.bio}>
              Deeply immersed in the world of code since 2018. I build 
              highly scalable and performant web applications using 
              cutting-edge technologies. My philosophy is to blend 
              technical excellence with aesthetic precision.
            </p>
            
            <div className={styles.stats}>
              <div className={styles.statBox}>
                <Cpu size={24} className={styles.icon} />
                <div>
                  <h3>50+</h3>
                  <p>Deployments</p>
                </div>
              </div>
              <div className={styles.statBox}>
                <Globe size={24} className={styles.icon} />
                <div>
                  <h3>10+</h3>
                  <p>Regions</p>
                </div>
              </div>
              <div className={styles.statBox}>
                <Zap size={24} className={styles.icon} />
                <div>
                  <h3>99.9%</h3>
                  <p>Uptime</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.skillSide}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={styles.skillTitle}>Tech Stack</h3>
            <div className={styles.skillGrid}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.skillBadge}>
                  {skill}
                </div>
              ))}
            </div>
            
            <div className={styles.profileFrame}>
               {/* Placeholder for Profile Image */}
               <div className={styles.profilePlaceholder}>
                 <span>IMAGE_DATA</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
