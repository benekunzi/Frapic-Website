"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/translations";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pt-4 md:pt-6 px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center hover:opacity-90 transition-opacity"
        >
          <span className="inline-block h-[72px] w-[119px] bg-[#16110e] [mask-image:url('/frapic-logo-font.webp')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:left_center] [-webkit-mask-image:url('/frapic-logo-font.webp')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:left_center]" />
          <span className="sr-only">Frapic</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-md rounded-2xl px-2 py-2 shadow-[0_4px_20px_rgba(22,17,14,0.12)]">
          <Link
            href="/about"
            className={clsx(
              "relative px-4 py-2 rounded-xl font-medium transition-colors text-sm",
              pathname === "/about"
                ? "text-[#16110e]"
                : "text-[#16110e] hover:bg-[#fff0ea]",
            )}
          >
            {pathname === "/about" && (
              <motion.span
                layoutId="desktop-nav-active"
                className="absolute inset-0 rounded-xl bg-[#fff0ea]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t.navbar.about}</span>
          </Link>
          <Link
            href="/faq"
            className={clsx(
              "relative px-4 py-2 rounded-xl font-medium transition-colors text-sm",
              pathname === "/faq"
                ? "text-[#16110e]"
                : "text-[#16110e] hover:bg-[#fff0ea]",
            )}
          >
            {pathname === "/faq" && (
              <motion.span
                layoutId="desktop-nav-active"
                className="absolute inset-0 rounded-xl bg-[#fff0ea]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t.navbar.faq}</span>
          </Link>
          <Link
            href="/donate"
            className={clsx(
              "relative flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-colors text-sm text-[#e94e34]",
              pathname !== "/donate" && "hover:bg-[#fff0ea]",
            )}
          >
            {pathname === "/donate" && (
              <motion.span
                layoutId="desktop-nav-active"
                className="absolute inset-0 rounded-xl bg-[#fff0ea]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Heart size={14} className="relative z-10 fill-[#e94e34]" />
            <span className="relative z-10">{t.navbar.donate}</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl font-medium text-[#16110e] hover:bg-[#fff0ea] transition-colors uppercase text-sm"
            >
              <span>{language}</span>
              <ChevronDown size={14} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-[#f0e2da] rounded-xl overflow-hidden shadow-xl py-2">
                {(["en", "de", "es"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangMenuOpen(false);
                    }}
                    className={clsx(
                      "w-full text-left px-4 py-2 text-sm hover:bg-[#fff0ea] transition-colors uppercase text-[#16110e]",
                    )}
                  >
                    {lang === "en"
                      ? "English"
                      : lang === "de"
                        ? "Deutsch"
                        : "Español"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          href="/#download"
          className="hidden md:inline-block shrink-0 px-6 py-3 bg-[#16110e] text-white rounded-2xl font-semibold text-sm hover:bg-black transition-all shadow-[0_4px_20px_rgba(22,17,14,0.18)]"
        >
          {t.navbar.downloadApp}
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/85 backdrop-blur-md text-[#16110e] shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={clsx(
              "flex items-center justify-center transition-transform duration-300",
              isMobileMenuOpen ? "rotate-180" : "rotate-0",
            )}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden mt-3 mx-auto max-w-7xl origin-top bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(22,17,14,0.18)]"
          >
            <div className="flex flex-col space-y-2 text-center">
              {(
                [
                  { href: "/about", label: t.navbar.about },
                  { href: "/faq", label: t.navbar.faq },
                ] as const
              ).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "rounded-2xl px-4 py-2.5 text-lg font-medium transition-colors",
                      isActive
                        ? "bg-[#fff0ea] text-[#16110e]"
                        : "text-[#16110e] hover:text-[#e94e34]",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                className={clsx(
                  "rounded-2xl px-4 py-2.5 text-lg font-medium transition-colors text-[#e94e34]",
                  pathname === "/donate" ? "bg-[#fff0ea]" : "hover:text-[#16110e]",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.navbar.donate}
              </Link>

              <div className="flex justify-center space-x-3 pt-4 border-t border-[#f0e2da]">
                {(["en", "de", "es"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                    }}
                    className={clsx(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-colors uppercase border",
                      language === lang
                        ? "bg-[#16110e] text-white border-[#16110e]"
                        : "text-[#6b5f57] border-[#f0e2da] hover:bg-[#fff0ea]",
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <Link
                href="/#download"
                className="px-6 py-3 bg-[#e94e34] text-white rounded-2xl font-semibold active:scale-95 transition-transform mx-auto inline-block mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.navbar.downloadApp}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
