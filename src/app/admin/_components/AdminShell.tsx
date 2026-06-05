"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, FolderOpen, ExternalLink, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import styles from "../admin.module.css";

const navLinks = [
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarBrand}>ADMIN PANEL</span>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {navLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={`${styles.sidebarLink} ${pathname === href || pathname.startsWith(href + "/") ? styles.active : ""}`}
          >
            <Icon size={15} />
            {label}
          </a>
        ))}

        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarDivider} />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sidebarLink}
          >
            <ExternalLink size={15} />
            View Site
          </a>
          <button onClick={handleLogout} className={styles.sidebarLinkDanger}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
