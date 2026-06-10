"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Open_Sans } from "next/font/google";
import Image from "next/image";

const openSans = Open_Sans({ weight: "400", subsets: ["latin"] });

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#0A0A0A] text-white py-16 pb-28 md:pb-16 border-t border-white/10 relative z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="tracking-tighter mb-6 inline-block text-xl">
                            <Image src="/frapic-logo-font.png" alt="Frapic Logo Font" width={80} height={80} className="inline-block mr-2" />
                        </Link>
                        <p className={`text-gray-400 max-w-sm text-sm mb-6 ${openSans.className}`}>
                            {t.footer.description}
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/#download"
                                className={`flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors w-max ${openSans.className}`}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.78,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.76 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div>
                                    <p className={`text-white/50 text-[9px] leading-tight ${openSans.className}`}>{t.download.iosPrefix}</p>
                                    <p className={`text-white text-xs font-semibold leading-tight ${openSans.className}`}>{t.download.iosStore}</p>
                                </div>
                            </Link>
                            {/* <Link
                                href="/#download"
                                className={`flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors w-max ${openSans.className}`}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                </svg>
                                <div>
                                    <p className="text-white/50 text-[9px] leading-tight">Get it on</p>
                                    <p className="text-white text-xs font-semibold leading-tight">Google Play</p>
                                </div>
                            </Link> */}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-white text-xl">{t.footer.productTitle}</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/#download" className="hover:text-white transition-colors">{t.footer.download}</Link></li>
                            <li><Link href="/#formats" className="hover:text-white transition-colors">{t.footer.features}</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">{t.navbar.faq}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-white text-xl">{t.footer.companyTitle}</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">{t.footer.aboutUs}</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
                            <li><Link href="/privacyPolicy" className="hover:text-white transition-colors">{t.footer.privacyPolicy}</Link></li>
                            <li><Link href="/community-guidelines" className="hover:text-white transition-colors">{t.navbar.guidelines}</Link></li>
                            <li><Link href="/termsOfUse" className="hover:text-white transition-colors">{t.footer.termsOfService}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {/* Social icon placeholders */}
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
