"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { navItems } from "@/lib/site-data";

function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="استديو أثر">
      <span className="brand-mark__word">أثر</span>
      <span className="brand-mark__line" aria-hidden="true" />
    </span>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <SmoothScroll />
      <header className="site-header">
        <Link href="/" className="site-header__brand">
          <BrandMark />
        </Link>
        <button
          className={`menu-trigger${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            <motion.nav
              className="menu-overlay__nav"
              aria-label="القائمة الرئيسية"
              initial={reducedMotion ? false : { y: "-95%" }}
              animate={{ y: 0 }}
              exit={reducedMotion ? undefined : { y: "-95%" }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={active ? "is-active" : ""}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.nav>

            <a
              className="menu-overlay__social"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <span>IG</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
