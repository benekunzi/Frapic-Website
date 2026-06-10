"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/translations";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-[#0A0A0A]/80 backdrop-blur-md shadow-sm py-4 border-b border-white/5"
                    : "bg-transparent py-6"
            )}
        >
            <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between text-white">
                {/* Logo */}
                <Link href="/" className="text-2xl tracking-tighter hover:opacity-80 transition-opacity flex items-center">
                    <Image src="/Frapic-Logo.png" alt="Frapic Logo" width={40} height={40} className="inline-block mr-2" />
                    <Image src="/frapic-logo-font.png" alt="Frapic Logo Font" width={80} height={80} className="inline-block mr-2" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/about" className="font-medium text-gray-300 hover:text-white transition-colors">
                        {t.navbar.about}
                    </Link>
                    <Link href="/faq" className="font-medium text-gray-300 hover:text-white transition-colors">
                        {t.navbar.faq}
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center space-x-1 font-medium text-gray-300 hover:text-white transition-colors uppercase"
                        >
                            <span>{language}</span>
                            <ChevronDown size={16} />
                        </button>

                        {isLangMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl py-2">
                                {(["en", "de", "es"] as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsLangMenuOpen(false);
                                        }}
                                        className={clsx(
                                            "w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors uppercase",
                                            language === lang ? "text-white " : "text-gray-400"
                                        )}
                                    >
                                        {lang === "en" ? "English" : lang === "de" ? "Deutsch" : "Español"}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/#download"
                        className="px-5 py-2.5 bg-[#e94e34] text-white rounded-full font-medium hover:bg-[#d44330] transition-all shadow-[0_0_20px_rgba(233,78,52,0.3)]"
                    >
                        {t.navbar.downloadApp}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-xl">
                    <div className="flex flex-col space-y-6 text-center text-white">
                        <Link
                            href="/about"
                            className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t.navbar.about}
                        </Link>
                        <Link
                            href="/faq"
                            className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t.navbar.faq}
                        </Link>

                        <div className="flex justify-center space-x-4 pt-4 border-t border-white/10">
                            {(["en", "de", "es"] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        setLanguage(lang);
                                    }}
                                    className={clsx(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-colors uppercase border",
                                        language === lang
                                            ? "bg-white text-black border-white"
                                            : "text-gray-400 border-white/20 hover:bg-white/10"
                                    )}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <Link
                            href="/#download"
                            className="px-6 py-3 bg-[#e94e34] text-white rounded-full font-medium active:scale-95 transition-transform mx-auto inline-block mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t.navbar.downloadApp}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
