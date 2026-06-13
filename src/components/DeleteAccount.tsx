"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function DeleteAccount() {
    const { t } = useLanguage();
    const content = t.deleteAccountPage;

    return (
        <section className="container-custom max-w-6xl pt-8">
            <div className="mb-14 text-center">
                <span className={`block ${anton.className} uppercase text-5xl md:text-7xl tracking-[-0.04em] leading-[0.9]`}>
                    {content.title}
                </span>
                <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    {content.subtitle}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 mb-8">
                <article className="rounded-3xl border border-white/10 bg-[#0c1218] p-7 md:p-8">
                    <h2 className="text-2xl md:text-3xl text-white mb-6 tracking-tight">{content.stepsTitle}</h2>
                    <div className="space-y-4">
                        {content.steps.map((step, index) => (
                            <div key={index} className="rounded-2xl border border-white/10 bg-[#0f1620] p-5">
                                <h3 className="text-white text-lg md:text-xl mb-2">{step.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="rounded-3xl border border-white/10 bg-[#0c1218] p-7 md:p-8">
                    <h2 className="text-2xl md:text-3xl text-white mb-6 tracking-tight">{content.dataTitle}</h2>
                    <ul className="space-y-4 text-gray-300 leading-relaxed">
                        {content.dataItems.map((item, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="text-white/80">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>

            <article className="rounded-3xl border border-red-500/30 bg-[#1a0808] p-7 md:p-8">
                <h2 className="text-2xl md:text-3xl text-white mb-3 tracking-tight">{content.warningTitle}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{content.warningText}</p>
            </article>
        </section>
    );
}
