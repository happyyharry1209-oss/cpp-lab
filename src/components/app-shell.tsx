"use client";

import {
  BadgeHelp,
  BookOpen,
  Home,
  Library,
  Route,
  Search,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const navigation = [
  { href: "/", label: "首頁" },
  { href: "/practice", label: "練習題庫" },
  { href: "/learn", label: "學習路線" },
  { href: "/notes", label: "筆記" },
  { href: "/about", label: "關於網站" },
];

const sidebar = [
  { href: "/", label: "首頁", icon: Home },
  { href: "/practice", label: "練習題庫", icon: Library },
  { href: "/learn", label: "學習路線", icon: Route },
  { href: "/notes", label: "我的筆記", icon: BookOpen },
  { href: "/dashboard", label: "個人中心", icon: UserRound },
];

function activeRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !["/", "/practice"].includes(pathname);

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-inner">
          <Logo />

          <nav className="primary-nav" aria-label="主要導覽">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  activeRoute(pathname, item.href) ? "is-active" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <form className="header-search" action="/practice">
              <Search size={18} aria-hidden="true" />
              <input
                name="q"
                type="search"
                aria-label="搜尋題目或知識點"
                placeholder="搜尋題目或知識點..."
              />
            </form>
            <Link
              className="icon-button"
              href="/about"
              aria-label="技術與網站說明"
              title="技術與網站說明"
            >
              <BadgeHelp size={20} />
            </Link>
            <Link
              className="avatar-button"
              href="/dashboard"
              aria-label="個人中心"
              title="個人中心"
            >
              <UserRound size={20} />
            </Link>
          </div>
        </div>
      </header>

      <div className={showSidebar ? "page-frame with-sidebar" : "page-frame"}>
        {showSidebar ? (
          <aside className="side-nav" aria-label="學習導覽">
            <nav>
              {sidebar.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      activeRoute(pathname, item.href)
                        ? "is-active"
                        : undefined
                    }
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="sidebar-note">
              <span className="sidebar-note-mark">C++</span>
              <strong>先理解，再動手</strong>
              <p>提示會一步一步展開，讓你保留思考的空間。</p>
            </div>
          </aside>
        ) : null}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
