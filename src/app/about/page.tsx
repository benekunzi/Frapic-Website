"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className={`bg-white text-[#16110e] ${plusJakarta.className}`}>
      {/* Hero */}
      <section className="flex flex-col items-center gap-7 bg-white px-4 pt-36 pb-14 text-center sm:px-6 md:pt-48 md:pb-20 lg:pt-[263px] lg:pb-24">
        <h1 className="max-w-[820px] text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-[64px]">
          {t.about.heroTitle}
        </h1>
        <div className="max-w-[640px] text-base leading-[1.6] text-[#666666] sm:text-lg md:text-xl">
          <p>{t.about.heroSubtitle1}</p>
          <p>{t.about.heroSubtitle2}</p>
        </div>
      </section>

      {/* Vision */}
      <section className="flex w-full flex-col items-center bg-white px-4 py-6 md:px-10">
        <div className="w-full max-w-[1048px] rounded-[28px] border border-[#D6D6D6] bg-[#F4F4F4] p-8 text-center drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)] sm:rounded-[32px] sm:p-14 md:p-20">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-[44px]">
            {t.about.visionTitle}
          </h2>
          <div className="mx-auto mt-7 flex max-w-[880px] flex-col gap-7 text-base leading-[1.6] text-[#4a4a4a] sm:text-lg">
            <p>{t.about.visionText1}</p>
            <p>{t.about.visionText2}</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="flex w-full flex-col items-center bg-white px-4 py-6 md:px-10">
        <div className="flex w-full max-w-[1048px] flex-col items-center gap-8">
          <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full sm:h-[170px] sm:w-[170px] md:h-[200px] md:w-[200px]">
            <Image
              src="/ProfilePic.webp"
              alt={t.about.founderName}
              fill
              sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, 200px"
              className="object-cover"
            />
          </div>
          <div className="flex w-full max-w-[700px] flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              {t.about.founderName}
            </h3>
            <span className="rounded-[20px] bg-[#FF8B77] px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.06em] text-white uppercase">
              {t.about.founderRole}
            </span>
            <p className="text-base leading-[1.6] text-[#4a4a4a] sm:text-lg">
              {t.about.founderBio1}
            </p>
            <p className="text-base leading-[1.6] text-[#4a4a4a] sm:text-lg">
              {t.about.founderBio2}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
