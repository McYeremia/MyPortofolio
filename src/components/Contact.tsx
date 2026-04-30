"use client";

import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Initialize <span className="neon-text">Contact</span></h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.info}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.infoTitle}>Network Access</h3>
            <p className={styles.infoDesc}>
              Ready to collaborate on futuristic projects. Open for freelance, 
              full-time positions, or technical consulting.
            </p>
            
            <div className={styles.contactMethods}>
              <div className={styles.method}>
                <Mail className={styles.icon} />
                <span>jerry@future.dev</span>
              </div>
              <div className={styles.method}>
                <MessageSquare className={styles.icon} />
                <span>@jerry_dev (Discord)</span>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className={styles.form}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.inputGroup}>
              <label>Identification</label>
              <input type="text" placeholder="Your Name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Communication Protocol</label>
              <input type="email" placeholder="Your Email" />
            </div>
            <div className={styles.inputGroup}>
              <label>Data Payload</label>
              <textarea placeholder="Your Message" rows={5}></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn}>
              Send Signal <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p>&copy; 2026 JERRY_DEV. All systems operational.</p>
      </footer>
    </section>
  );
};

export default Contact;
