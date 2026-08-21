"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "800"],
  subsets: ["latin"],
});

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className={`bg-white pt-24 pb-28 md:pt-28 md:pb-16 relative z-10 px-4 md:px-10 lg:px-20 ${plusJakarta.className}`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-12">
          <div className="max-w-sm">
            <Link
              href="/"
              className="tracking-tighter mb-6 inline-block text-xl"
            >
              <span className="inline-block h-[72px] w-[119px] bg-[#16110e] [mask-image:url('/frapic-logo-font.webp')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:left_center] [-webkit-mask-image:url('/frapic-logo-font.webp')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:left_center]" />
              <span className="sr-only">Frapic</span>
            </Link>
            <p className="text-[#666666] max-w-sm text-sm leading-[1.6] mb-6">
              {t.footer.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://apps.apple.com/de/app/frapic/id6778465385"
                target="_blank"
                className="rounded-2xl border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#16110e] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all hover:bg-black/5"
              >
                {t.download.iosStore}
              </Link>
              <Link
                href="/#download"
                className="rounded-2xl bg-[#16110e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all hover:bg-black"
              >
                {t.download.androidStore}
              </Link>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-6 text-[#16110e] text-lg font-extrabold">
                {t.footer.productTitle}
              </h4>
              <ul className="space-y-4 text-[#666666] text-sm">
                <li>
                  <Link
                    href="/#download"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.footer.download}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#formats"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.footer.features}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.navbar.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[#16110e] text-lg font-extrabold">
                {t.footer.companyTitle}
              </h4>
              <ul className="space-y-4 text-[#666666] text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.footer.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donate"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.navbar.donate}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacyPolicy"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.footer.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community-guidelines"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.navbar.guidelines}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termsOfUse"
                    className="hover:text-[#16110e] transition-colors"
                  >
                    {t.footer.termsOfService}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-[#666666] text-sm">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
