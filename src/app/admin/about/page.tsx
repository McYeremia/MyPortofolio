"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import AdminShell from "../_components/AdminShell";
import styles from "../admin.module.css";

interface Stat {
  value: string;
  label: string;
}

interface AboutData {
  bio: string;
  skills: string[];
  stats: Stat[];
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>({
    bio: "",
    skills: [],
    stats: [],
  });
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (d) setData({ bio: d.bio, skills: d.skills, stats: d.stats as Stat[] });
      })
      .catch(() => {});
  }, []);

  const addSkill = () => {
    const val = newSkill.trim();
    if (val && !data.skills.includes(val)) {
      setData((prev) => ({ ...prev, skills: [...prev.skills, val] }));
    }
    setNewSkill("");
  };

  const removeSkill = (skill: string) =>
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  const updateStat = (index: number, field: keyof Stat, value: string) =>
    setData((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });

  const addStat = () =>
    setData((prev) => ({ ...prev, stats: [...prev.stats, { value: "", label: "" }] }));

  const removeStat = (index: number) =>
    setData((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "Tersimpan." : "Gagal menyimpan.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <AdminShell>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>About</h1>
          <p className={styles.pageSub}>Edit bio, statistik, dan tech stack</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={styles.btnPrimary}
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {message && (
        <p className={message === "Tersimpan." ? styles.success : styles.error}>
          {message}
        </p>
      )}

      {/* Bio */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Bio</p>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="bio">TEKS</label>
          <textarea
            id="bio"
            className={styles.textarea}
            rows={5}
            value={data.bio}
            onChange={(e) => setData((prev) => ({ ...prev, bio: e.target.value }))}
          />
        </div>
      </div>

      {/* Stats */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Statistik</p>
        {data.stats.map((stat, i) => (
          <div key={i} className={styles.statRow}>
            <input
              className={styles.input}
              placeholder="Nilai (50+)"
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Label (Deployments)"
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
            />
            <button onClick={() => removeStat(i)} className={styles.btnDanger}>
              <X size={14} />
            </button>
          </div>
        ))}
        <button onClick={addStat} className={styles.btnSecondary} style={{ marginTop: "0.75rem" }}>
          <Plus size={14} /> Tambah Statistik
        </button>
      </div>

      {/* Skills */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Tech Stack</p>
        <div className={styles.tagList}>
          {data.skills.map((skill) => (
            <span key={skill} className={styles.tag}>
              {skill}
              <button onClick={() => removeSkill(skill)} className={styles.tagRemove} aria-label="Remove">
                ×
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            className={styles.input}
            placeholder="Nama teknologi..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <button onClick={addSkill} className={styles.btnSecondary}>
            <Plus size={14} /> Tambah
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
