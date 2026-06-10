"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Anton, Open_Sans } from "next/font/google";
import FormatsSection from "@/components/FormatsSection";
// import { FutureTasksSection } from "@/components/FutureTasksSection";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["400"], subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState("formats");

  const valuesData = [
    {
      id: "privacy",
      title: t.values[0].title,
      desc: t.values[0].desc,
    },
    {
      id: "independent",
      title: t.values[1].title,
      desc: t.values[1].desc,
    },
    {
      id: "european",
      title: t.values[2].title,
      desc: t.values[2].desc,
    }
  ];

  const navItems = [
    { id: "formats", label: t.navItems.formats },
    { id: "journals", label: t.navItems.journals },
    { id: "privacy", label: t.navItems.privacy },
    { id: "independent", label: t.navItems.independent },
    { id: "european", label: t.navItems.european },
  ];


  // Section Observer for the Floating Pill
  useEffect(() => {
    const ids = ["formats", "journals", "privacy", "independent", "european"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Trigger update when the section crosses roughly the middle of the viewport
      { rootMargin: "-30% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lenis Smooth Scrolling Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent any jitter between the two
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup to prevent memory leaks
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (id: string) => {
    lenisRef.current?.scrollTo(`#${id}`, { offset: -50 });
  };

  useEffect(() => {
    const mm = gsap.matchMedia(pageRef);

    // Ensure DOM is fully painted and next/image layout is stable
    // before initializing ScrollTrigger calculations
    const timeoutId = setTimeout(() => {
      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      }, () => {

        gsap.fromTo(
          ".hero-title",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
        );

        gsap.fromTo(
          ".hero-subtitle",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        // Journals Section Animation
        gsap.set(".journals-text", { y: "15vh" }); // Add vertical movement
        gsap.set(".journals-title-1", { x: "-15vw" }); // Slide offset to left
        gsap.set(".journals-title-2", { x: "15vw" });  // Slide offset to right
        gsap.set(".journals-desc-1", { y: "20vh" }); // Desc slide up
        gsap.set(".journals-desc-2", { y: "20vh" }); // Desc slide up
        gsap.set(".journals-image", { y: "40vh", x: "30vw", rotation: 45, transformOrigin: "center center" });

        const journalsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".journals-scene",
            start: "top bottom", // Starts as soon as the very top of new section enters from bottom of screen
            end: "center center", // Extended the duration back to the center of the screen so the rotation takes longer
            scrub: 1,
          },
        });

        journalsTimeline
          .to(
            ".journals-text",
            {
              y: 0,
              ease: "power2.out",
            },
            0
          )
          .to(
            ".journals-title-1",
            {
              x: 0,
              ease: "power2.out",
            },
            0
          )
          .to(
            ".journals-title-2",
            {
              x: 0,
              ease: "power2.out",
            },
            0
          )
          .to(
            ".journals-desc-1",
            {
              y: 0,
              ease: "power2.out",
            },
            0
          )
          .to(
            ".journals-desc-2",
            {
              y: 0,
              ease: "power2.out",
            },
            0.1 // slight delay for a subtle staggered effect between the two descriptions
          )
          .to(
            ".journals-image",
            {
              y: 0,
              x: 0,
              rotation: 0, // Ends perfectly straight
              ease: "power2.out",
            },
            0
          );

        // Core Values Section Animation
        const valuesElements = gsap.utils.toArray(".value-content");
        valuesElements.forEach((el, i) => {
          const isRight = i % 2 === 0;
          const titleWrapper = (el as Element).querySelector(".value-title-wrap");

          // 1. Move Title from inside to outside
          if (titleWrapper) {
            gsap.fromTo(
              titleWrapper,
              { x: isRight ? "-5vw" : "5vw" }, // Start 'inside'
              {
                x: 0, // Move 'outside' to its real aligned position
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el as Element,
                  start: "top 95%",
                  end: "center 45%",
                  scrub: 1,
                },
              }
            );
          }

          // 2. Fill text effect using clip-path
          const fillEl = (el as Element).querySelector(".title-fill");
          if (fillEl) {
            gsap.fromTo(
              fillEl,
              // Expanded vertical padding (-50%) on the inset so text descenders (like 'y') don't get cut off!
              { clipPath: isRight ? "inset(-50% -50% -50% 100%)" : "inset(-50% 100% -50% -50%)" },
              {
                clipPath: "inset(-50% -50% -50% -50%)",
                ease: "none",
                scrollTrigger: {
                  trigger: el as Element,
                  start: "top 85%",
                  end: "center 45%",
                  scrub: 1,
                },
              }
            );
          }

          // 3. Subtitle slide up
          const subtitle = (el as Element).querySelector(".value-desc");
          if (subtitle) {
            gsap.fromTo(
              subtitle,
              { y: 60, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el as Element,
                  start: "top 45%", // Starts appearing right as the title finishes its fill
                  end: "top 25%",
                  scrub: 1,
                },
              }
            );
          }
        });

      });
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      mm.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="bg-[#0A0A0A] text-white">
      {/* Floating Pill Navigation */}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-max -translate-x-1/2 items-center justify-center gap-0 sm:gap-2 rounded-full border border-white/10 bg-[#0A0A0A]/70 p-0.5 sm:px-2 sm:py-2 backdrop-blur-xl shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative whitespace-nowrap rounded-full px-1.5 py-1 min-[375px]:px-2 sm:px-4 sm:py-2 text-[9px] min-[375px]:text-[10px] sm:text-sm transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePillIndicator"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-clip px-6 md:px-12 md:mt-[10vh] z-30">
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="hero-copy w-full text-center mt-20">
            <h1 className="hero-title">
              <span className={`block transform scale-y-[2.5] origin-bottom ${anton.className} uppercase text-7xl leading-[0.8] tracking-[-0.05em] sm:text-8xl md:text-10xl lg:text-[10rem] xl:text-[12rem] xl:tracking-[-0.02em]`}>
                {t.hero.title1}
              </span>
              <span className="block mt-8 text-lg font-light uppercase tracking-[0.3em] text-gray-300 sm:text-xl md:text-4xl">
                {t.hero.title2}
              </span>
            </h1>
            <p className={`hero-subtitle mt-8 mx-auto max-w-2xl ${openSans.className} text-base text-gray-400 sm:text-lg md:text-xl`}>
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="relative bg-[#0A0A0A] px-6 py-10 md:py-10 overflow-hidden z-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(233,78,52,0.05)_0%,_transparent_65%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.p
            className="text-[#e94e34] text-xs tracking-[0.4em] uppercase mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t.manifesto.tag}
          </motion.p>

          <motion.h2
            className={`${anton.className} uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-16`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <span className="block">{t.manifesto.headline1}</span>
            <span className="block">{t.manifesto.headline2}</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 mb-16 max-w-3xl mx-auto text-left">
            {t.manifesto.noItems.map((item, i) => {
              const firstWord = item.split(" ")[0];
              const rest = item.slice(firstWord.length);
              return (
                <motion.p
                  key={item}
                  className={`${openSans.className} text-xl md:text-2xl lg:text-3xl font-light`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                >
                  <span className="text-[#e94e34] font-semibold">{firstWord}</span>
                  <span className="text-white">{rest}</span>
                </motion.p>
              );
            })}
          </div>

          <motion.p
            className={`${openSans.className} text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {t.manifesto.description}
          </motion.p>
        </div>
      </section>

      {/* Formats Section */}
      <FormatsSection />

      {/* Shared Journals Section */}
      <section id="journals" className="journals-scene relative flex min-h-screen items-center overflow-x-clip px-4 py-32 md:px-8 mt-[-10vh] z-30 mb-[10vh]">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-between gap-12 md:flex-row">

          <div className="journals-text w-full max-w-3xl text-left md:w-1/2 md:pl-4 lg:pl-8">
            <h2 className="text-8xl flex flex-col leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] overflow-visible">
              <span className="journals-title-1 block">{t.journals.title1}</span>
              <span className="journals-title-2 block">{t.journals.title2}</span>
            </h2>

            <div className="mt-10 flex max-w-xl flex-col gap-8">
              <div className="journals-desc-1">
                <h3 className="mb-2 text-2xl text-white sm:text-3xl">{t.journals.desc1Title}</h3>
                <p className={`text-lg leading-relaxed ${openSans.className} text-gray-400 sm:text-xl font-light`}>
                  {t.journals.desc1Text}
                </p>
              </div>
              <div className="journals-desc-2">
                <h3 className="mb-2 text-2xl text-white sm:text-3xl">{t.journals.desc2Title}</h3>
                <p className={`text-lg leading-relaxed ${openSans.className} text-gray-400 sm:text-xl font-light`}>
                  {t.journals.desc2Text}
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex w-full justify-center md:w-1/2 md:justify-end pr-0 md:pr-12 lg:pr-24">
            <div className="journals-image relative aspect-[320/693] w-full max-w-[260px] lg:max-w-[320px] rounded-[42px] p-[7px] bg-[linear-gradient(150deg,#2a2a2e,#0c0c0d_42%,#1a1a1d)] shadow-[0_2px_4px_rgba(0,0,0,.6),0_50px_90px_-22px_rgba(0,0,0,.92),inset_0_0_0_1px_rgba(255,255,255,.10)]">
              <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#111]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/journal-promo.webm" type="video/webm" />
                  <source src="/journal-promo.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[26px] bg-black rounded-full z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-scene relative bg-[#0A0A0A] overflow-hidden pb-[5vh] pt-12 md:pb-[15vh] md:pt-12 mt-[-10vh]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-40 px-6 md:gap-80 md:px-12">
          {valuesData.map((val, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={val.id}
                id={val.id}
                className={`value-content flex w-full flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}
              >
                <div className="max-w-[100%] md:max-w-5xl">
                  <div className="value-title-wrap inline-block">
                    <div className="relative inline-block mb-6">
                      {/* Dark/transparent base text that is always visible */}
                      <h3 className="text-6xl tracking-tighter text-white/10 sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] leading-[0.85]">
                        {val.title}
                      </h3>
                      {/* Bright white overlay text that fills in */}
                      <h3
                        className="title-fill absolute left-0 top-0 h-full w-full text-6xl tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] leading-[0.85]"
                        aria-hidden="true"
                      >
                        {val.title}
                      </h3>
                    </div>
                  </div>
                  <p className={`value-desc text-xl leading-relaxed ${openSans.className} text-gray-400 sm:text-2xl md:text-3xl lg:leading-[1.5] font-light`}>
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download" className="relative bg-[#0A0A0A] px-6 py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(233,78,52,0.07)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            className="text-[#e94e34] text-xs tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t.download.tag}
          </motion.p>

          <motion.h2
            className={`${anton.className} uppercase text-7xl md:text-9xl leading-[0.9] tracking-tight mb-6`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            {t.download.title}
          </motion.h2>

          <motion.p
            className={`${openSans.className} text-gray-400 text-xl mb-12`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {t.download.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <a
              href="#"
              className="flex items-center gap-4 pl-5 pr-8 py-4 bg-white rounded-2xl hover:bg-white/90 transition-all shadow-lg w-56"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black shrink-0">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.78,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.76 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <p className={`text-black/50 text-[10px] leading-tight ${openSans.className}`}>{t.download.iosPrefix}</p>
                <p className={`text-black text-base font-bold leading-tight ${openSans.className}`}>{t.download.iosStore}</p>
              </div>
            </a>
            {/* <a
              href="#"
              className={`flex items-center gap-4 pl-5 pr-8 py-4 bg-white rounded-2xl hover:bg-white/90 transition-all shadow-lg w-56 ${openSans.className}`}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black shrink-0">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <p className={`text-black/50 text-[10px] leading-tight ${openSans.className}`}>{t.download.androidPrefix}</p>
                <p className={`text-black text-base font-bold leading-tight ${openSans.className}`}>{t.download.androidStore}</p>
              </div>
            </a> */}
          </motion.div>

          <p className={`${openSans.className} text-gray-600 text-sm`}>{t.download.comingSoon}</p>
        </div>
      </section>
    </main>
  );
}
