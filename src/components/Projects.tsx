"use client";

import styles from './Projects.module.css';
import { motion } from 'framer-motion';
import { ExternalLink, CodeXml } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Neural Network Viz",
      description: "A real-time visualization of neural network layers and weight distributions.",
      tech: ["Next.js", "Three.js", "TensorFlow.js"],
      link: "#",
      github: "#"
    },
    {
      title: "Quantum Ledger",
      description: "Decentralized finance dashboard with quantum-resistant encryption patterns.",
      tech: ["React", "Solidity", "Ethers.js"],
      link: "#",
      github: "#"
    },
    {
      title: "Cyber-Security OS",
      description: "A web-based terminal interface for monitoring network security and vulnerabilities.",
      tech: ["Node.js", "Socket.io", "React"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Recent <span className="neon-text">Projects</span></h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.browserDots}>
                  <span></span><span></span><span></span>
                </div>
                <div className={styles.links}>
                  <a href={project.github} title="View Source"><CodeXml size={18} /></a>
                  <a href={project.link} title="Live Demo"><ExternalLink size={18} /></a>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.techStack}>
                  {project.tech.map((t, i) => (
                    <span key={i} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.glowOverlay}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
