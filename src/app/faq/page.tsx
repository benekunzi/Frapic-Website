"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ weight: ["500"], subsets: ["latin"] });

export default function FAQ() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
            <section id="faq" className="container-custom max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl  mb-12 text-center text-white">{t.faq.title}</h2>
                <div className="space-y-4">
                    {t.faq.questions.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0c1218] text-gray-300 transition-colors"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-white text-lg">{faq.q}</span>
                                <span className={clsx("transition-transform duration-300 text-gray-400", activeIndex === index ? "rotate-180" : "")}>
                                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={`px-6 pb-6 pt-4 text-gray-400 leading-relaxed border-t border-slate-800 mt-2 whitespace-pre-wrap ${openSans.className}`}>
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}