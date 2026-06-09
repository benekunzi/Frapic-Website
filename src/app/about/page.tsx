"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Anton, Open_Sans } from "next/font/google";
import { useLanguage } from "../../context/LanguageContext";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["500"], subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

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

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = [
                document.getElementById("vision-section"),
                document.getElementById("team-section")
            ];

            sections.forEach((sectionEl) => {
                if (sectionEl) {
                    const elementsToAnimate = sectionEl.querySelectorAll(".value-title-wrap, .value-desc");

                    elementsToAnimate.forEach((el) => {
                        gsap.fromTo(
                            el,
                            { y: 60, autoAlpha: 0 },
                            {
                                y: 0,
                                autoAlpha: 1,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: sectionEl,
                                    start: "top 95%",
                                    end: "center 45%",
                                    scrub: 1,
                                },
                            }
                        );
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden pb-32">
            {/* Hero Section */}
            <section className="min-h-[90dvh] flex flex-col items-center justify-center px-4 relative z-10 gap-8 mt-50">
                <span className={`block transform scale-y-[2.5] origin-bottom ${anton.className} uppercase text-7xl leading-[0.8] tracking-[-0.05em] sm:text-8xl md:text-10xl lg:text-[10rem] xl:text-[12rem] xl:tracking-[-0.02em]`}>
                    {t.about.heroTitle}
                </span>
                <p className={`text-xl md:text-3xl ${openSans.className} text-gray-200 w-full px-4 sm:px-8 text-center leading-relaxed`}>
                    {t.about.heroSubtitle1}
                    <br />
                    {t.about.heroSubtitle2}
                </p>
            </section>

            {/* Vision Section */}
            <section className="py-12 px-4 w-full md:px-12 flex justify-center text-center overflow-hidden">
                <div id="vision-section" className="flex w-full flex-col justify-center items-center">
                    <div className="w-full">
                        <div className="value-title-wrap inline-block mb-6 opacity-0">
                            <h3 className="flex gap-4 md:gap-8 text-7xl md:text-[9rem] tracking-tighter text-white leading-none">
                                <span>{t.about.visionTitle1}</span>
                                <span>{t.about.visionTitle2}</span>
                            </h3>
                        </div>
                        <div className={`value-desc space-y-6 text-xl leading-relaxed ${openSans.className} text-gray-200 sm:text-2xl md:text-3xl lg:leading-[1.5] w-full mt-12 mb-32 opacity-0 max-w-7xl mx-auto`}>
                            <p>{t.about.visionText1}</p>
                            <p>{t.about.visionText2}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 px-4 w-full md:px-12 flex justify-center text-center overflow-hidden">
                <div id="team-section" className="flex w-full flex-col justify-center items-center">
                    <div className="w-full">
                        <div className="value-title-wrap inline-block mb-6 opacity-0">
                            <h3 className="flex gap-4 md:gap-8 text-7xl md:text-[9rem]  tracking-tighter text-white leading-none">
                                <span>{t.about.teamTitle1}</span>
                                <span>{t.about.teamTitle2}</span>
                            </h3>
                        </div>
                        <div className={`value-desc flex flex-col items-center space-y-6 text-xl leading-relaxed ${openSans.className} text-gray-200 sm:text-2xl md:text-3xl lg:leading-[1.5] w-full mt-12 mb-32 opacity-0 max-w-7xl mx-auto`}>
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-800 mb-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/ProfilePic.webp" alt="Benedict Kunzmann" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Benedict+Kunzmann&background=random'; }} />
                            </div>
                            <div>
                                <h4 className="text-3xl md:text-5xl  text-white mb-2">{t.about.founderName}</h4>
                                <p className={`text-lg md:text-xl ${openSans.className} text-blue-500 font-semibold mb-8`}>{t.about.founderRole}</p>
                            </div>
                            <p className={`max-w-4xl ${openSans.className}`}>
                                {t.about.founderBio1}
                                <br />
                                {t.about.founderBio2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
