"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Anton, Open_Sans } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const sans = Open_Sans({ weight: "400", subsets: ["latin"] });

export default function FormatsSection() {
  const { t } = useLanguage();
  return (
    <section
      id="formats"
      className="relative min-h-screen py-[clamp(64px,8vh,120px)] px-[clamp(20px,5vw,72px)] flex flex-col justify-center overflow-hidden isolate bg-[#0A0A0A] text-white antialiased"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[min(900px,90vw)] h-[680px] -z-10 pointer-events-none bg-[radial-gradient(closest-side,rgba(120,120,135,.20),rgba(120,120,135,.05)_55%,transparent_72%)] blur-[8px]" />
      {/* Grain */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-50 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,.04),transparent),radial-gradient(1px_1px_at_80%_70%,rgba(255,255,255,.03),transparent)]" />

      <div className="w-full max-w-[1240px] mx-auto">
        {/* Header */}
        <header className="grid grid-cols-[1.35fr_0.9fr] max-[1080px]:grid-cols-1 items-end gap-8 max-[1080px]:gap-[14px] mb-[clamp(40px,6vh,76px)]">
          <div>
            <motion.span
              className={`inline-flex items-center gap-[9px] text-[12px] font-semibold tracking-[.32em] uppercase text-[#8a8a8e] mb-[18px] before:content-[''] before:w-[26px] before:h-px before:bg-[#5c5c61] ${sans.className}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {t.navItems.formats}
            </motion.span>
            <motion.h2
              className={`font-normal text-[clamp(44px,6.6vw,92px)] leading-[.92] tracking-[-.005em] ${anton.className}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {t.formatsSection.title1}<br /><em className="not-italic text-[#74747c]">{t.formatsSection.title2}</em>
            </motion.h2>
          </div>
          <motion.p
            className={`text-[#8a8a8e] text-[clamp(15px,1.15vw,17px)] leading-[1.55] max-w-[38ch] max-[1080px]:max-w-[48ch] pb-[6px] [&_b]:text-white [&_b]:font-semibold ${sans.className}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {t.formatsSection.subtitle}
          </motion.p>
        </header>

        {/* Phones row */}
        <div className="flex justify-center items-start gap-[clamp(20px,3.4vw,52px)] max-[920px]:flex-wrap">

          {/* ===== STORY ===== */}
          <motion.article
            className="group flex flex-col items-center w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className="relative w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px] aspect-[9/19.4] rounded-[42px] p-[7px] bg-[linear-gradient(150deg,#2a2a2e,#0c0c0d_42%,#1a1a1d)] shadow-[0_2px_4px_rgba(0,0,0,.6),0_30px_60px_-18px_rgba(0,0,0,.85),inset_0_0_0_1px_rgba(255,255,255,.06)] mt-5">
                <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#111] text-[13px]">
                  <Image
                    src="/Story.jpeg"
                    alt=""
                    fill
                    style={{ objectFit: "cover", zIndex: 0 }}
                    sizes="282px"
                  />
                  {/* Dynamic Island */}
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[26px] bg-black rounded-full z-10" />
                </div>
              </div>
            </div>
            <div className="mt-[30px] text-center w-[min(100%,300px)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className={`text-[11px] tracking-[.3em] text-[#fff] font-semibold ${anton.className}`}>01</div>
              <h3 className={`font-normal text-[30px] leading-none my-[9px] tracking-[.01em] ${anton.className}`}>{t.formatsSection.storyName}</h3>
              <p className={`text-[#8a8a8e] text-[13.5px] leading-[1.5] ${sans.className}`}>{t.formatsSection.storyDesc}</p>
            </div>
          </motion.article>

          {/* ===== FRAPIC (hero) ===== */}
          <motion.article
            className="group flex flex-col items-center w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px] max-[920px]:order-[-1]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.30 }}
          >
            <div className="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className="relative w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px] aspect-[9/19.4] rounded-[42px] p-[7px] bg-[linear-gradient(150deg,#2a2a2e,#0c0c0d_42%,#1a1a1d)] shadow-[0_2px_4px_rgba(0,0,0,.6),0_50px_90px_-22px_rgba(0,0,0,.92),inset_0_0_0_1px_rgba(255,255,255,.10)] mt-5">
                <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#111] text-[13px]">
                  <Image
                    src="/Frapic-Example.jpeg"
                    alt=""
                    fill
                    style={{ objectFit: "cover", zIndex: 0 }}
                    sizes="300px"
                  />
                  {/* Dynamic Island */}
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[26px] bg-black rounded-full z-10" />
                </div>
              </div>
            </div>
            <div className="mt-[30px] text-center w-[min(100%,300px)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className={`text-[11px] tracking-[.3em] text-[#fff] font-semibold ${anton.className}`}>02</div>
              <h3 className={`font-normal text-[30px] leading-none my-[9px] tracking-[.01em] ${anton.className}`}>{t.formatsSection.frapicName}</h3>
              <p className={`text-[#8a8a8e] text-[13.5px] leading-[1.5] ${sans.className}`}>{t.formatsSection.frapicDesc}</p>
            </div>
          </motion.article>

          {/* ===== POST ===== */}
          <motion.article
            className="group flex flex-col items-center w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
          >
            <div className="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className="relative w-[282px] max-[1080px]:w-[248px] max-[920px]:w-[262px] aspect-[9/19.4] rounded-[42px] p-[7px] bg-[linear-gradient(150deg,#2a2a2e,#0c0c0d_42%,#1a1a1d)] shadow-[0_2px_4px_rgba(0,0,0,.6),0_50px_90px_-22px_rgba(0,0,0,.92),inset_0_0_0_1px_rgba(255,255,255,.10)] mt-5">
                <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#111] text-[13px]">
                  <Image
                    src="/Post.jpeg"
                    alt=""
                    fill
                    style={{ objectFit: "cover", zIndex: 0 }}
                    sizes="300px"
                  />
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[26px] bg-black rounded-full z-10" />
                </div>
              </div>
            </div>
            <div className="mt-[30px] text-center w-[min(100%,300px)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]">
              <div className={`text-[11px] tracking-[.3em] text-[#fff] font-semibold ${anton.className}`}>03</div>
              <h3 className={`font-normal text-[30px] leading-none my-[9px] tracking-[.01em] ${anton.className}`}>{t.formatsSection.postName}</h3>
              <p className={`text-[#8a8a8e] text-[13.5px] leading-[1.5] ${sans.className}`}>{t.formatsSection.postDesc}</p>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}
