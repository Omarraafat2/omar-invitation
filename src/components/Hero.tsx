
"use client";

import { motion } from "framer-motion";

type HeroProps = {
  language: "en" | "ar";
};

export default function Hero({ language }: HeroProps) {
  const isArabic = language === "ar";

  return (
    <section className="hero-section">
      <video
        className="hero-section__video"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero-section__overlay" />

      <motion.div
        className="hero-section__content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <span className="hero-section__eyebrow">
          {isArabic
            ? "بمشاركة عائلتينا"
            : "TOGETHER WITH OUR FAMILIES"}
        </span>

        <h1>
          Omar <span>&</span> Aya
        </h1>

        <div className="hero-section__ornament">
          ✧ ─── ❦ ─── ✧
        </div>

        <p className="hero-section__date">
          26 · 11 · 2026
        </p>

        <p className="hero-section__time">
          THURSDAY · 6:00 PM
        </p>

        <a href="#home" className="hero-section__scroll">
          {isArabic ? "اكتشفوا الدعوة" : "SCROLL TO DISCOVER"}
          <span>↓</span>
        </a>
      </motion.div>
    </section>
  );
}
