"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Heart } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { claimThankYouGif } from "@/app/actions";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const PRESET_AMOUNTS = [
  { value: 3, coffee: true },
  { value: 10, coffee: false },
  { value: 20, coffee: false },
  { value: 50, coffee: false },
];

const MIN_AMOUNT = 3;
const MAX_AMOUNT = 10000;

export default function DonatePage() {
  const { t } = useLanguage();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(10);
  const [customValue, setCustomValue] = useState("");
  const [donatedAmount, setDonatedAmount] = useState<number | null>(null);
  const [donationError, setDonationError] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifLoading, setGifLoading] = useState(false);
  const [gifError, setGifError] = useState(false);

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  const parsedCustom = useMemo(() => {
    const parsed = parseFloat(customValue.replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : null;
  }, [customValue]);

  const customValid =
    parsedCustom !== null &&
    parsedCustom >= MIN_AMOUNT &&
    parsedCustom <= MAX_AMOUNT;
  const customTooSmall =
    customValue.trim() !== "" &&
    parsedCustom !== null &&
    parsedCustom < MIN_AMOUNT;
  const amount = customValid ? parsedCustom : selectedPreset;

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setCustomValue("");
    setDonationError(false);
  };

  const handleCustomChange = (value: string) => {
    setCustomValue(value);
    setSelectedPreset(null);
    setDonationError(false);
  };

  const handleShowGif = async () => {
    setGifLoading(true);
    setGifError(false);
    const result = await claimThankYouGif();
    if ("error" in result) {
      setGifError(true);
    } else {
      setGifUrl(result.gif.url);
    }
    setGifLoading(false);
  };

  return (
    <main className={`bg-white text-[#16110e] ${plusJakarta.className}`}>
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 bg-white px-4 pt-36 pb-14 text-center sm:px-6 md:pt-48 md:pb-20 lg:pt-[263px]">
        <h1 className="max-w-[760px] text-4xl font-extrabold leading-[1.12] sm:text-5xl md:text-6xl lg:text-[56px]">
          {t.donate.headline1} {t.donate.headline2}
        </h1>
        <p className="max-w-[640px] text-base leading-[1.6] text-[#666666] sm:text-lg md:text-xl">
          {t.donate.subtitle}
        </p>
      </section>

      {/* Why support */}
      <section className="flex w-full flex-col items-center bg-white px-4 py-6 md:px-10">
        <div className="flex w-full max-w-[1048px] flex-col items-center gap-7 rounded-[28px] border border-[#B0B0B0] bg-[#F4F4F4] p-8 text-center shadow-[3px_7px_14.5px_0px_rgba(0,0,0,0.25)] sm:rounded-[32px] sm:p-14 md:p-20">
          <h2 className="max-w-[880px] text-3xl font-bold sm:text-4xl md:text-[44px]">
            {t.donate.storyTitle}
          </h2>
          <p className="max-w-[880px] text-base leading-[1.6] text-[#4a4a4a] sm:text-lg">
            {t.donate.storyText}
          </p>
          <p className="text-[18px] font-bold tracking-[0.08em] text-black uppercase">
            {t.donate.usageTitle}
          </p>
          <div className="flex w-full max-w-[700px] flex-col gap-4 text-left">
            {t.donate.usageItems.map((item) => (
              <p
                key={item.desc}
                className="text-base leading-[1.5] text-[#4a4a4a]"
              >
                &bull; {item.desc}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="flex w-full flex-col items-center bg-white px-4 py-16 md:py-20">
        <div className="w-full max-w-[600px]">
          <AnimatePresence mode="wait">
            {donatedAmount === null ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-9 text-center"
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-bold sm:text-4xl md:text-[40px]">
                    {t.donate.amountTitle}
                  </h2>
                  <p className="text-lg text-[#666666]">
                    {t.donate.amountSubtitle}
                  </p>
                </div>

                <div className="grid w-full grid-cols-2 gap-4">
                  {PRESET_AMOUNTS.map((preset) => {
                    const active =
                      customValue.trim() === "" &&
                      selectedPreset === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handlePresetClick(preset.value)}
                        className={clsx(
                          "relative flex h-[104px] w-full flex-col items-center justify-center rounded-[20px] border-2 transition-colors",
                          active
                            ? "border-[#171717] bg-[#171717] text-white"
                            : "border-[#D6D6D6] bg-[#FAFAFA] text-[#16110e] hover:border-[#FF8B77]",
                        )}
                      >
                        <span className="text-[26px] font-bold">
                          €{preset.value}
                        </span>
                        {preset.coffee && (
                          <span
                            className={clsx(
                              "absolute bottom-3.5 text-[13px]",
                              active ? "text-white/70" : "text-[#8a8a8a]",
                            )}
                          >
                            ☕ {t.donate.coffee}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex w-full flex-col items-start gap-2 text-left">
                  <label
                    htmlFor="custom-amount"
                    className="text-[15px] font-semibold text-[#666666]"
                  >
                    {t.donate.customLabel}
                  </label>
                  <div className="relative w-full">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-[#0A0A0A]">
                      €
                    </span>
                    <input
                      id="custom-amount"
                      type="text"
                      inputMode="decimal"
                      value={customValue}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      placeholder={t.donate.customPlaceholder}
                      className={clsx(
                        "w-full rounded-[18px] border-2 bg-[#FAFAFA] py-[18px] pr-4 pl-9 text-base font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-[#8a8a8a]",
                        customValue.trim() === ""
                          ? "border-[#D6D6D6] focus:border-[#FF8B77]"
                          : customValid
                            ? "border-[#171717]"
                            : "border-[#e94e34]",
                      )}
                    />
                  </div>
                  {customTooSmall && (
                    <p className="text-xs text-[#e94e34]">
                      {t.donate.minAmount}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  {paypalClientId ? (
                    <PayPalScriptProvider
                      options={{
                        clientId: paypalClientId,
                        currency: "EUR",
                        intent: "capture",
                        components: "buttons",
                      }}
                    >
                      <PayPalButtons
                        style={{
                          layout: "vertical",
                          shape: "pill",
                          color: "black",
                          label: "donate",
                          height: 55,
                        }}
                        disabled={amount === null}
                        forceReRender={[amount ?? 0]}
                        createOrder={(_data, actions) =>
                          actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                description: "Donation to Frapic",
                                amount: {
                                  currency_code: "EUR",
                                  value: (amount ?? 0).toFixed(2),
                                },
                              },
                            ],
                          })
                        }
                        onApprove={async (_data, actions) => {
                          try {
                            await actions.order?.capture();
                            setDonatedAmount(amount ?? 0);
                          } catch {
                            setDonationError(true);
                          }
                        }}
                        onError={() => setDonationError(true)}
                      />
                    </PayPalScriptProvider>
                  ) : (
                    <p className="rounded-[18px] bg-[#F4F4F4] px-4 py-3 text-sm text-[#4a4a4a]">
                      {t.donate.paypalMissing}
                    </p>
                  )}
                </div>
                {donationError && (
                  <p className="text-sm text-[#e94e34]">
                    {t.donate.donationError}
                  </p>
                )}
                <p className="text-[13px] text-[#8a8a8a]">
                  {t.donate.secureNote}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8B77] text-white">
                  <Heart size={28} className="fill-white" />
                </span>
                <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">
                  {t.donate.thankYouHeadline1}
                  <br />
                  {t.donate.thankYouHeadline2}
                </h2>
                <p className="mt-4 text-[#4a4a4a]">{t.donate.thankYouText}</p>

                <div className="mt-6 inline-flex items-center gap-3 rounded-[20px] bg-[#171717] px-5 py-2 text-white">
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-white/60 uppercase">
                    {t.donate.thankYouAmount}
                  </span>
                  <span className="font-bold">€{donatedAmount.toFixed(2)}</span>
                </div>

                <div className="mt-10">
                  {gifUrl ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={gifUrl}
                        alt="Thank you GIF"
                        className="mx-auto w-full max-w-sm rounded-2xl shadow-[0_20px_40px_rgba(22,17,14,0.2)]"
                      />
                      <p className="mt-4 text-xs text-[#8a8a8a]">
                        {t.donate.gifNote}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleShowGif}
                        disabled={gifLoading}
                        className={clsx(
                          "inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(22,17,14,0.2)] transition-all",
                          gifLoading
                            ? "bg-[#171717]/60"
                            : "bg-[#171717] hover:bg-black",
                        )}
                      >
                        {gifLoading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            {t.donate.gifLoading}
                          </>
                        ) : (
                          <>🎁 {t.donate.gifButton}</>
                        )}
                      </button>
                      {gifError && (
                        <p className="mt-3 text-sm text-[#e94e34]">
                          {t.donate.gifError}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <Link
                  href="/"
                  className="mt-10 inline-block text-sm font-semibold text-[#e94e34] transition-colors hover:text-[#16110e]"
                >
                  ← {t.donate.backHome}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
