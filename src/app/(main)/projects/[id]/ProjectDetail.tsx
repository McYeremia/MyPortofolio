"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import styles from "./project-detail.module.css";

interface Section {
  id: number;
  title: string | null;
  description: string;
  imageUrl: string | null;
  order: number;
}

interface GalleryImage {
  id: number;
  url: string;
  caption: string | null;
  order: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  layout: string;
}

interface Props {
  project: Project;
  sections: Section[];
  gallery: GalleryImage[];
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

export default function ProjectDetail({ project, sections, gallery }: Props) {
  const isAlternating = project.layout === "alternating";

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className={styles.backWrap}>
        <a href="/#projects" className={styles.back}>
          <ArrowLeft size={15} />
          All Projects
        </a>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <motion.div className={styles.heroInner} {...fadeUp()}>
          <div className={styles.heroBadge}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.year}>{project.year}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
          <div className={styles.heroLinks}>
            {project.githubUrl && project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                View Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtnPrimary}>
                Live Demo <ExternalLink size={13} />
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Sections */}
      {sections.length > 0 && (
        <div className={styles.sections}>
          {sections.map((section, index) => {
            const hasImage = !!section.imageUrl;
            const isReversed = isAlternating && index % 2 !== 0;

            return (
              <motion.section
                key={section.id}
                className={`${styles.section} ${
                  isAlternating && hasImage
                    ? isReversed
                      ? styles.sectionReversed
                      : styles.sectionNormal
                    : styles.sectionPlain
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className={styles.sectionText}>
                  {section.title && (
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                  )}
                  <p className={styles.sectionDesc}>{section.description}</p>
                </div>

                {isAlternating && hasImage && (
                  <div className={styles.sectionImageWrap}>
                    <img
                      src={section.imageUrl!}
                      alt={section.title ?? "Section image"}
                      className={styles.sectionImage}
                    />
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.galleryInner}>
            <motion.div
              className={styles.galleryHeader}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className={styles.galleryLabel}>PROJECT GALLERY</span>
            </motion.div>
            <div className={styles.galleryGrid}>
              {gallery.map((img, i) => (
                <motion.div
                  key={img.id}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                >
                  <img
                    src={img.url}
                    alt={img.caption ?? `Gallery image ${i + 1}`}
                    className={styles.galleryImage}
                  />
                  {img.caption && (
                    <p className={styles.galleryCaption}>{img.caption}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
