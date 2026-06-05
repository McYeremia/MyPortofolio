"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Plus, Trash2, X, ImagePlus, ArrowLeft, Save } from "lucide-react";
import AdminShell from "../../_components/AdminShell";
import styles from "../../admin.module.css";

interface Section {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  _dirty?: boolean;
}

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
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
  order: number;
}

const emptySection = (order: number): Section => ({
  title: "",
  description: "",
  imageUrl: "",
  order,
  _dirty: true,
});

export default function ProjectContentPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [layout, setLayout] = useState("plain");
  const [sections, setSections] = useState<Section[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/projects`).then((r) => r.ok ? r.json() : []),
      fetch(`/api/projects/${projectId}/sections`).then((r) => r.ok ? r.json() : []),
      fetch(`/api/projects/${projectId}/gallery`).then((r) => r.ok ? r.json() : []),
    ]).then(([projects, secs, imgs]) => {
      const p = (projects as Project[]).find((x) => x.id === parseInt(projectId));
      if (p) { setProject(p); setLayout(p.layout); }
      setSections(secs.map((s: Section) => ({
        ...s,
        imageUrl: s.imageUrl ?? "",
        title: s.title ?? "",
        _dirty: false,
      })));
      setGallery(imgs.map((i: GalleryImage) => ({ ...i, caption: i.caption ?? "" })));
    }).catch(() => {});
  }, [projectId]);

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // ── Sections ──────────────────────────────
  const addSection = () => {
    setSections((prev) => [...prev, emptySection(prev.length + 1)]);
    setHasUnsaved(true);
  };

  const updateSection = (index: number, field: keyof Section, value: string | number) => {
    setSections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value, _dirty: true };
      return next;
    });
    setHasUnsaved(true);
  };

  const removeSection = async (index: number) => {
    const s = sections[index];
    if (s.id) {
      const res = await fetch(`/api/projects/${projectId}/sections/${s.id}`, { method: "DELETE" });
      if (!res.ok) { showMessage("Gagal menghapus section.", "error"); return; }
    }
    setSections((prev) => prev.filter((_, i) => i !== index));
    showMessage("Section dihapus.");
  };

  // ── Image upload (section) ────────────────
  const uploadSectionImage = async (index: number, file: File) => {
    setUploading(`section-${index}`);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) { showMessage("Upload gagal.", "error"); setUploading(null); return; }
    const { url } = await res.json();

    // Update state
    const updated = [...sections];
    updated[index] = { ...updated[index], imageUrl: url, _dirty: true };
    setSections(updated);
    setHasUnsaved(true);
    setUploading(null);
  };

  // ── Save all ──────────────────────────────
  const saveAll = async () => {
    if (!project) return;
    setSaving(true);

    try {
      // 1. Save layout
      await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, layout }),
      });

      // 2. Save all sections
      const updatedSections = [...sections];
      for (let i = 0; i < updatedSections.length; i++) {
        const s = updatedSections[i];
        const body = {
          title: s.title || null,
          description: s.description,
          imageUrl: s.imageUrl || null,
          order: s.order,
        };

        if (s.id) {
          await fetch(`/api/projects/${projectId}/sections/${s.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } else {
          const res = await fetch(`/api/projects/${projectId}/sections`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const created = await res.json();
          updatedSections[i] = { ...updatedSections[i], id: created.id, _dirty: false };
        }
        updatedSections[i]._dirty = false;
      }

      setSections(updatedSections);
      setHasUnsaved(false);
      showMessage("Semua perubahan disimpan.");
    } catch {
      showMessage("Terjadi kesalahan saat menyimpan.", "error");
    }

    setSaving(false);
  };

  // ── Gallery ───────────────────────────────
  const uploadGalleryImage = async (file: File) => {
    setUploading("gallery");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) { showMessage("Upload gagal.", "error"); setUploading(null); return; }
    const { url } = await res.json();

    const addRes = await fetch(`/api/projects/${projectId}/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, caption: "", order: gallery.length + 1 }),
    });
    const img = await addRes.json();
    setGallery((prev) => [...prev, { ...img, caption: img.caption ?? "" }]);
    setUploading(null);
    showMessage("Gambar ditambahkan ke galeri.");
  };

  const removeGalleryImage = async (id: number) => {
    const res = await fetch(`/api/projects/${projectId}/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      setGallery((prev) => prev.filter((i) => i.id !== id));
      showMessage("Gambar dihapus.");
    }
  };

  if (!project) return (
    <AdminShell>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Memuat...</p>
    </AdminShell>
  );

  return (
    <AdminShell>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <a href="/admin/projects" className={styles.back}>
            <ArrowLeft size={14} /> Kembali ke Projects
          </a>
          <h1 className={styles.pageTitle} style={{ marginTop: "0.5rem" }}>
            {project.title}
          </h1>
          <p className={styles.pageSub}>Layout · Sections · Galeri</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
          <button onClick={saveAll} disabled={saving} className={styles.btnPrimary}>
            <Save size={14} />
            {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
          </button>
          {hasUnsaved && !saving && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Ada perubahan yang belum disimpan
            </span>
          )}
        </div>
      </div>

      {message && (
        <p
          className={message.type === "success" ? styles.success : styles.error}
          style={{ marginBottom: "1.5rem" }}
        >
          {message.text}
        </p>
      )}

      {/* ── Step 1: Layout ─────────────────── */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>1 — Pilih Layout</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            {
              value: "alternating",
              label: "Layout 1 — Alternating",
              desc: "Tiap section tampil dengan deskripsi + gambar, posisi bergantian kiri-kanan. Gambar bersifat opsional per section.",
            },
            {
              value: "plain",
              label: "Layout 2 — Plain",
              desc: "Section berisi teks saja. Semua gambar tampil di galeri bawah halaman.",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setLayout(opt.value); setHasUnsaved(true); }}
              className={styles.layoutCard}
              style={{
                border: `2px solid ${layout === opt.value ? "var(--text-primary)" : "var(--border)"}`,
                background: layout === opt.value ? "var(--bg-base)" : "transparent",
              }}
            >
              <span className={styles.layoutCardTitle}>{opt.label}</span>
              <span className={styles.layoutCardDesc}>{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Sections ───────────────── */}
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <p className={styles.cardTitle} style={{ marginBottom: "0.25rem" }}>2 — Sections</p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              {layout === "alternating"
                ? "Setiap section bisa punya judul, deskripsi, dan gambar (opsional)."
                : "Setiap section berisi teks saja. Gambar ditambahkan di galeri bawah."}
            </p>
          </div>
          <button onClick={addSection} className={styles.btnSecondary}>
            <Plus size={14} /> Tambah Section
          </button>
        </div>

        {sections.length === 0 && (
          <div className={styles.emptyState}>
            <p>Belum ada section. Klik &quot;Tambah Section&quot; untuk mulai.</p>
          </div>
        )}

        {sections.map((section, index) => (
          <div
            key={index}
            className={styles.sectionCard}
            style={{ borderColor: section._dirty ? "var(--border-strong)" : "var(--border)" }}
          >
            <div className={styles.sectionCardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className={styles.sectionCardIndex}>Section {index + 1}</span>
                {section._dirty && (
                  <span style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                    • belum disimpan
                  </span>
                )}
              </div>
              <button onClick={() => removeSection(index)} className={styles.btnDanger}>
                <Trash2 size={13} />
              </button>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>JUDUL <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(opsional)</span></label>
              <input
                className={styles.input}
                placeholder="Judul section..."
                value={section.title}
                onChange={(e) => updateSection(index, "title", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>DESKRIPSI</label>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder="Tuliskan deskripsi section di sini..."
                value={section.description}
                onChange={(e) => updateSection(index, "description", e.target.value)}
              />
            </div>

            {layout === "alternating" && (
              <div className={styles.field}>
                <label className={styles.label}>
                  GAMBAR <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(opsional)</span>
                </label>
                {section.imageUrl ? (
                  <div className={styles.imagePreview}>
                    <img src={section.imageUrl} alt="preview" className={styles.previewImg} />
                    <button
                      onClick={() => updateSection(index, "imageUrl", "")}
                      className={styles.removeImage}
                    >
                      <X size={13} /> Hapus Gambar
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadZone}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadSectionImage(index, f);
                      }}
                    />
                    <ImagePlus size={20} />
                    <span>
                      {uploading === `section-${index}`
                        ? "Mengupload..."
                        : "Klik untuk upload gambar"}
                    </span>
                  </label>
                )}
              </div>
            )}

            <div className={styles.field} style={{ maxWidth: 140 }}>
              <label className={styles.label}>URUTAN</label>
              <input
                type="number"
                className={styles.input}
                value={section.order}
                onChange={(e) => updateSection(index, "order", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        ))}

        {sections.length > 0 && (
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
            Klik <strong>Simpan Semua Perubahan</strong> di atas setelah selesai mengedit.
          </p>
        )}
      </div>

      {/* ── Step 3: Gallery ────────────────── */}
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div>
            <p className={styles.cardTitle} style={{ marginBottom: "0.25rem" }}>3 — Galeri Project</p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              Gambar di galeri tampil di bagian bawah halaman detail project. Upload langsung tersimpan.
            </p>
          </div>
          <button
            onClick={() => galleryInputRef.current?.click()}
            className={styles.btnSecondary}
            disabled={uploading === "gallery"}
          >
            <ImagePlus size={14} />
            {uploading === "gallery" ? "Mengupload..." : "Upload Gambar"}
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { uploadGalleryImage(f); e.target.value = ""; }
            }}
          />
        </div>

        {gallery.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Belum ada gambar. Klik &quot;Upload Gambar&quot; untuk menambahkan.</p>
          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {gallery.map((img) => (
              <div key={img.id} className={styles.galleryItem}>
                <img src={img.url} alt={img.caption || "gallery"} className={styles.galleryImg} />
                <button
                  onClick={() => removeGalleryImage(img.id)}
                  className={styles.galleryDelete}
                  title="Hapus gambar"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating save reminder */}
      {hasUnsaved && (
        <div className={styles.saveReminder}>
          <span>Ada perubahan yang belum disimpan</span>
          <button onClick={saveAll} disabled={saving} className={styles.btnPrimary}>
            <Save size={13} />
            {saving ? "Menyimpan..." : "Simpan Sekarang"}
          </button>
        </div>
      )}
    </AdminShell>
  );
}
