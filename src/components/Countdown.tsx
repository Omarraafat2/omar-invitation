
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  language: "en" | "ar";
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EVENT_DATE = new Date("2026-11-26T18:00:00+02:00").getTime();

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, EVENT_DATE - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ language }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const units = [
    {
      value: timeLeft?.days ?? 0,
      label: language === "ar" ? "يوم" : "DAYS",
    },
    {
      value: timeLeft?.hours ?? 0,
      label: language === "ar" ? "ساعة" : "HOURS",
    },
    {
      value: timeLeft?.minutes ?? 0,
      label: language === "ar" ? "دقيقة" : "MINUTES",
    },
    {
      value: timeLeft?.seconds ?? 0,
      label: language === "ar" ? "ثانية" : "SECONDS",
    },
  ];

  return (
    <section
      className="countdown-section"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        className="countdown-section__content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">
          {language === "ar" ? "احفظوا الموعد" : "SAVE THE DATE"}
        </span>

        <h2>
          {language === "ar"
            ? "اللحظة المنتظرة تقترب"
            : "Counting Down to Our Day"}
        </h2>

        <div className="countdown-section__grid">
          {units.map((unit) => (
            <div className="countdown-card" key={unit.label}>
           <strong>
  {new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(unit.value)}
</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>

        <p className="countdown-section__date">
          THURSDAY · NOVEMBER 26 · 2026
        </p>
      </motion.div>
    </section>
  );
}
