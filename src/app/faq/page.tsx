"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "600", "800"],
  subsets: ["latin"],
});

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <main className={`bg-white text-[#16110e] ${plusJakarta.className}`}>
      <section className="flex flex-col items-center bg-white px-4 pt-36 pb-14 text-center sm:px-6 md:pt-48 md:pb-20 lg:pt-[263px]">
        <h1 className="max-w-[820px] text-4xl font-extrabold leading-[1.12] sm:text-5xl md:text-6xl lg:text-[56px]">
          {t.faq.title}
        </h1>
      </section>

      <section className="flex w-full flex-col items-center bg-white px-4 pb-20 sm:px-6 md:pb-24">
        <div className="flex w-full max-w-[1048px] flex-col gap-4">
          {t.faq.questions.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="w-full rounded-[20px] border border-[#D6D6D6] bg-white p-7 shadow-[0_3px_7px_rgba(0,0,0,0.15)]"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-lg font-semibold text-[#16110e]">
                    {faq.q}
                  </span>
                  <span
                    className={clsx(
                      "shrink-0 text-[#16110e] transition-transform duration-300",
                      isOpen ? "rotate-180" : "",
                    )}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 border-t border-[#D6D6D6] pt-5">
                        <div className="space-y-4 text-base leading-[1.55] whitespace-pre-line text-[#4a4a4a]">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
