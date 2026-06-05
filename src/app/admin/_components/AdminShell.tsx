"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, FolderOpen, ExternalLink, LogOut } from "lucide-react";
import styles from "../admin.module.css";

const navLinks = [
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <span className={styles.sidebarBrand}>ADMIN PANEL</span>

        {navLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={`${styles.sidebarLink} ${pathname === href ? styles.active : ""}`}
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
