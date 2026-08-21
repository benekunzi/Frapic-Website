"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Ban, Lock, MapPin } from "lucide-react";

const INFO_CARD_ICONS = [Ban, Lock, MapPin];

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "800"],
  subsets: ["latin"],
});

function Highlight({
  children,
  color = "#FF416C",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="underline decoration-2 underline-offset-4"
      style={{ textDecorationColor: color }}
    >
      {children}
    </span>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="text-[#16110e]">
      {/* Hero */}
      <section
        id="download"
        className="relative bg-white px-4 pt-28 pb-4 md:px-10 md:pt-32 md:pb-6 lg:px-20"
      >
        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="relative h-[560px] w-full overflow-hidden rounded-[28px] sm:h-[600px] md:h-[620px] md:rounded-[32px] drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)]">
            <Image
              src="/hero-photo.webp"
              alt="Freunde teilen einen Moment"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/28" />

            <div
              className={`absolute bottom-24 left-6 max-w-[600px] text-white sm:bottom-28 md:bottom-14 md:left-14 ${plusJakarta.className}`}
            >
              <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
                {t.hero.title1}, {t.hero.title2}.
              </h1>
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/85 sm:text-[20px]">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="absolute bottom-6 left-6 flex gap-3 sm:bottom-8 md:bottom-14 md:left-auto md:right-14">
              <Link
                href="https://apps.apple.com/de/app/frapic/id6778465385"
                target="_blank"
                className={`rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#16110e] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:bg-white/90 ${plusJakarta.className}`}
              >
                {t.download.iosStore}
              </Link>
              <Link
                href="/#download"
                className={`rounded-2xl bg-[#16110e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all hover:bg-black ${plusJakarta.className}`}
              >
                {t.download.androidStore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        id="formats"
        className="relative bg-white px-4 py-14 md:px-10 md:py-20 lg:px-20"
      >
        <div className="mx-auto flex w-full max-w-[1048px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className={`w-full max-w-[460px] ${plusJakarta.className}`}>
            <h2 className="text-3xl font-extrabold leading-[1.18] text-[#16110e] sm:text-4xl md:text-[2.75rem]">
              {t.story.headline}
            </h2>
            <p className="mt-5 text-base leading-[1.6] text-[#666666] sm:text-lg">
              {t.story.subtitleBefore}
              <Highlight>{t.story.subtitleHighlight}</Highlight>
              {t.story.subtitleAfter}
            </p>
          </div>

          <div className="relative aspect-[661/527] w-full max-w-[260px] sm:max-w-[520px] lg:max-w-[661px]">
            <div
              className="absolute"
              style={{
                left: "0%",
                top: "14.71%",
                width: "50%",
                height: "100%",
                transform: "rotate(-8deg)",
              }}
            >
              <Image
                src="/story-phone-1.webp"
                alt="Frapic Story"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.25)]"
                sizes="(max-width: 768px) 33vw, 220px"
              />
            </div>
            <div
              className="absolute z-10"
              style={{
                left: "26%",
                top: "0%",
                width: "50%",
                height: "100%",
              }}
            >
              <Image
                src="/story-phone-2.webp"
                alt="Frapic Story-Capture"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.3)]"
                sizes="(max-width: 768px) 33vw, 220px"
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "52%",
                top: "8.9%",
                width: "50%",
                height: "100%",
                transform: "rotate(8deg)",
              }}
            >
              <Image
                src="/story-phone-3.webp"
                alt="Frapic Story-Feed"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.25)]"
                sizes="(max-width: 768px) 33vw, 220px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="relative bg-white px-4 py-14 md:px-10 md:py-20 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1048px] flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="relative aspect-[466/489] w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[466px]">
            <div
              className="absolute"
              style={{
                left: "0%",
                top: "7.57%",
                width: "50%",
                height: "100%",
                transform: "rotate(-6deg)",
              }}
            >
              <Image
                src="/feed-phone-1.webp"
                alt="Frapic Feed"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.25)]"
                sizes="(max-width: 768px) 47vw, 220px"
              />
            </div>
            <div
              className="absolute z-10"
              style={{
                left: "40%",
                top: "0%",
                width: "50%",
                height: "100%",
                transform: "rotate(6deg)",
              }}
            >
              <Image
                src="/feed-phone-2.webp"
                alt="Frapic Kommentare"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.3)]"
                sizes="(max-width: 768px) 47vw, 220px"
              />
            </div>
          </div>

          <div className={`w-full max-w-[460px] ${plusJakarta.className}`}>
            <h2 className="text-3xl font-extrabold leading-[1.18] text-[#16110e] sm:text-4xl md:text-[2.75rem]">
              {t.feed.headline}
            </h2>
            <p className="mt-5 text-base leading-[1.6] text-[#666666] sm:text-lg">
              {t.feed.subtitleBefore}
              <Highlight color="#FF4B2B">{t.feed.subtitleHighlight}</Highlight>
              {t.feed.subtitleAfter}
            </p>
          </div>
        </div>
      </section>

      {/* Shared Journals Section */}
      <section
        id="journals"
        className="relative bg-white px-4 py-6 md:px-10 md:py-10 lg:px-20"
      >
        <div className="mx-auto flex w-full max-w-[1048px] flex-col items-center gap-10 rounded-[28px] bg-[#F4F4F4] p-8 md:flex-row md:justify-between md:gap-16 md:p-14 md:rounded-[32px] border-1 border-[#D6D6D6] drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)]">
          <div
            className={`w-full max-w-[500px] text-left ${plusJakarta.className}`}
          >
            <h2 className="text-4xl font-extrabold leading-[1.1] text-[#16110e] sm:text-5xl">
              {t.journals.title}
            </h2>
            <p className="mt-5 text-base leading-[1.6] text-[#666666] sm:text-lg">
              {t.journals.description}
            </p>
          </div>

          <div className="relative aspect-[260/537] w-full max-w-[220px] shrink-0 md:max-w-[260px]">
            <Image
              src="/journal-phone.webp"
              alt="Frapic Journal"
              fill
              className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.18)]"
              sizes="(max-width: 768px) 60vw, 260px"
            />
          </div>
        </div>
      </section>

      {/* Memory */}
      <section className="relative bg-white px-4 pt-14 pb-[92px] md:px-10 md:pt-20 md:pb-[116px] lg:px-20">
        <div className="mx-auto flex w-full max-w-[1048px] flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="relative aspect-[466/489] w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[466px]">
            <div
              className="absolute"
              style={{
                left: "0%",
                top: "7.57%",
                width: "50%",
                height: "100%",
                transform: "rotate(-6deg)",
              }}
            >
              <Image
                src="/memory-phone-1.webp"
                alt="Frapic Kalender-Liste"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.25)]"
                sizes="(max-width: 768px) 47vw, 220px"
              />
            </div>
            <div
              className="absolute z-10"
              style={{
                left: "40%",
                top: "0%",
                width: "50%",
                height: "100%",
                transform: "rotate(6deg)",
              }}
            >
              <Image
                src="/memory-phone-2.webp"
                alt="Frapic Kalender"
                fill
                className="object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.3)]"
                sizes="(max-width: 768px) 47vw, 220px"
              />
            </div>
          </div>

          <div className={`w-full max-w-[460px] ${plusJakarta.className}`}>
            <h2 className="text-3xl font-extrabold leading-[1.18] text-[#16110e] sm:text-4xl md:text-[2.75rem]">
              {t.memory.headline}
            </h2>
            <p className="mt-5 text-base leading-[1.6] text-[#666666] sm:text-lg">
              {t.memory.subtitleBefore}
              <Highlight>{t.memory.subtitleHighlight}</Highlight>
              {t.memory.subtitleAfter}
            </p>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="relative bg-white px-4 pt-6 pb-4 md:px-10 md:pt-10 md:pb-6 lg:px-20">
        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="relative z-20 -mb-[60px] rounded-[28px] bg-[#F9D3D5] px-4 pt-12 pb-16 sm:rounded-[32px] md:rounded-[32px] md:px-10 md:pt-16 md:pb-20 lg:px-20 border-1 border-[#D6D6D6] drop-shadow-[0_3px_7px_rgba(0,0,0,0.15)]">
            <div className={`mx-auto max-w-[1048px] ${plusJakarta.className}`}>
              <h2 className="text-center text-3xl font-bold leading-tight text-[#16110e] sm:text-4xl md:text-[2.75rem]">
                {t.info.heading}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
                {t.info.cards.map((card, index) => {
                  const Icon = INFO_CARD_ICONS[index];
                  return (
                    <div
                      key={card.title}
                      className="flex flex-col gap-3 rounded-3xl bg-white p-8 border-1 border-[#D6D6D6]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center text-black">
                        <Icon size={26} strokeWidth={2.25} />
                      </div>
                      <h3 className="text-xl font-bold text-[#16110e]">
                        {card.title}
                      </h3>
                      <p className="text-[15px] leading-[1.6] text-[#4a4a4a]">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
