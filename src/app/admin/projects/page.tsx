"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Settings, ImagePlus } from "lucide-react";
import AdminShell from "../_components/AdminShell";
import styles from "../admin.module.css";

interface Project {
  id?: number;
  title: string;
  category: string;
  year: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  thumbnailUrl: string;
  order: number;
}

const emptyProject = (): Project => ({
  title: "",
  category: "",
  year: new Date().getFullYear().toString(),
  description: "",
  githubUrl: "",
  liveUrl: "",
  thumbnailUrl: "",
  order: 0,
});

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetch("/api/projects")
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setProjects(data.map((p: Project) => ({ ...p, thumbnailUrl: p.thumbnailUrl ?? "" }))))
      .catch(() => setProjects([]));

  useEffect(() => { load(); }, []);

  const openNew = () => setModal(emptyProject());
  const openEdit = (p: Project) => setModal({ ...p, thumbnailUrl: p.thumbnailUrl ?? "" });
  const closeModal = () => setModal(null);

  const update = (field: keyof Project, value: string | number) =>
    setModal((prev) => (prev ? { ...prev, [field]: value } : prev));

  const uploadThumbnail = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      update("thumbnailUrl", url);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!modal) return;
    setSaving(true);
    setMessage("");

    const isNew = !modal.id;
    const url = isNew ? "/api/projects" : `/api/projects/${modal.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...modal, thumbnailUrl: modal.thumbnailUrl || null }),
    });

    setSaving(false);
    if (res.ok) {
      closeModal();
      load();
      setMessage(isNew ? "Project ditambahkan." : "Project disimpan.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Gagal menyimpan.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus project ini?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      load();
      setMessage("Project dihapus.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <AdminShell>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageSub}>Kelola project yang ditampilkan di portfolio</p>
        </div>
        <button onClick={openNew} className={styles.btnPrimary}>
          <Plus size={15} /> Tambah Project
        </button>
      </div>

      {message && (
        <p className={styles.success} style={{ marginBottom: "1rem" }}>{message}</p>
      )}

      <div className={styles.projectList}>
        {projects.length === 0 && (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Belum ada project.
          </p>
        )}
        {projects.map((p) => (
          <div key={p.id} className={styles.projectRow}>
            {/* Thumbnail preview */}
            <div className={styles.projectThumb}>
              {p.thumbnailUrl
                ? <img src={p.thumbnailUrl} alt={p.title} className={styles.projectThumbImg} />
                : <div className={styles.projectThumbEmpty} />
              }
            </div>
            <div className={styles.projectRowInfo}>
              <span className={styles.projectRowTitle}>{p.title}</span>
              <span className={styles.projectRowMeta}>{p.category} · {p.year}</span>
            </div>
            <div className={styles.projectRowActions}>
              <a href={`/admin/projects/${p.id}`} className={styles.btnSecondary}>
                <Settings size={13} /> Kelola Konten
              </a>
              <button onClick={() => openEdit(p)} className={styles.btnSecondary}>
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => handleDelete(p.id!)} className={styles.btnDanger}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {modal.id ? "Edit Project" : "Tambah Project"}
              </h2>
              <button onClick={closeModal} className={styles.modalClose}>
                <X size={18} />
              </button>
            </div>

            {/* Thumbnail */}
            <div className={styles.field}>
              <label className={styles.label}>THUMBNAIL</label>
              {modal.thumbnailUrl ? (
                <div className={styles.imagePreview}>
                  <img src={modal.thumbnailUrl} alt="thumbnail" className={styles.previewImg} />
                  <button onClick={() => update("thumbnailUrl", "")} className={styles.removeImage}>
                    <X size={13} /> Hapus Gambar
                  </button>
                </div>
              ) : (
                <label className={styles.uploadZone}>
                  <input
                    ref={thumbInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadThumbnail(f);
                    }}
                  />
                  <ImagePlus size={18} />
                  <span>{uploading ? "Mengupload..." : "Klik untuk upload thumbnail"}</span>
                </label>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>TITLE</label>
              <input className={styles.input} placeholder="Project name" value={modal.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>CATEGORY</label>
              <input className={styles.input} placeholder="e.g. Web App" value={modal.category} onChange={(e) => update("category", e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className={styles.field}>
                <label className={styles.label}>YEAR</label>
                <input className={styles.input} placeholder="2024" value={modal.year} onChange={(e) => update("year", e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>ORDER</label>
                <input className={styles.input} type="number" placeholder="1" value={modal.order} onChange={(e) => update("order", parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>DESCRIPTION</label>
              <textarea className={styles.textarea} rows={3} placeholder="Short description" value={modal.description} onChange={(e) => update("description", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>GITHUB URL</label>
              <input className={styles.input} placeholder="https://github.com/..." value={modal.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>LIVE URL</label>
              <input className={styles.input} placeholder="https://..." value={modal.liveUrl} onChange={(e) => update("liveUrl", e.target.value)} />
            </div>

            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.btnSecondary}>Batal</button>
              <button onClick={handleSave} disabled={saving || uploading} className={styles.btnPrimary}>
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
