"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

import Hero from "@/components/Hero";
import InvitationMessage from "@/components/InvitationMessage";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import RSVP from "@/components/GuestBook";

export default function MainInvitation() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  // Smooth scroll for anchor links (nav logo + "scroll to discover")
  const smoothScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Continuous Auto Scroll
  useEffect(() => {
    let rafId = 0;
    let resumeTimeout: ReturnType<typeof setTimeout>;
    let isPaused = false;
    let lastTime = 0;
    let position = window.scrollY; // float position (browser rounds scrollTop)

    const speed = 150; 
    const resumeDelay = 2500;

    const getMax = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const step = (time: number) => {
      if (isPaused) return;

      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const max = getMax();
      position = Math.min(position + speed * dt, max);

      window.scrollTo({
        top: position,
        behavior: "instant" as ScrollBehavior,
      });

      if (position < max) {
        rafId = requestAnimationFrame(step);
      }
    };

    const start = () => {
      if (isPaused) return;
      position = window.scrollY; // re-sync after manual scrolling
      lastTime = 0;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(step);
    };

    const pause = () => {
      isPaused = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimeout);

      resumeTimeout = setTimeout(() => {
        isPaused = false;
        start();
      }, resumeDelay);
    };

    const events = [
      "wheel",
      "touchstart",
      "touchmove",
      "pointerdown",
      "keydown",
    ] as const;

    events.forEach((e) =>
      window.addEventListener(e, pause, { passive: true })
    );

    // Wait until the page content is rendered.
    const initial = setTimeout(start, 500);

    return () => {
      clearTimeout(initial);
      clearTimeout(resumeTimeout);
      cancelAnimationFrame(rafId);
      events.forEach((e) => window.removeEventListener(e, pause));
    };
  }, []);

  return (
    <div className="main-invitation">
      {/* Navigation */}
      <nav className="invitation-nav">
        <a
          href="#home"
          onClick={(e) => smoothScrollTo(e, "home")}
          className="invitation-nav__logo"
        >
          O <span>&</span> A
        </a>

        <button
          type="button"
          onClick={() =>
            setLanguage((current) => (current === "en" ? "ar" : "en"))
          }
          className="invitation-nav__language"
        >
          <Languages size={17} />
          {isArabic ? "English" : "العربية"}
        </button>
      </nav>

      {/* First Section - Hero Video */}
      <Hero language={language} />

      {/* Second Section - Invitation Hero */}
      <section
        id="home"
        className="invitation-hero"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="invitation-hero__decoration">✦</div>

        <motion.div
          className="invitation-hero__content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="section-eyebrow">
            {isArabic ? "بمشاركة عائلتينا" : "TOGETHER WITH OUR FAMILIES"}
          </span>

          <h1>
            Omar <span>&</span> Aya
          </h1>

          <h2>
            {isArabic
              ? "يسعدنا دعوتكم للاحتفال بخطوبتنا"
              : "We're Getting Engaged!"}
          </h2>

          <div className="hero-ornament">✧ ─── ❦ ─── ✧</div>

          <p className="invitation-hero__date">26 · 11 · 2026</p>

          <span className="invitation-hero__time">THURSDAY · 6:00 PM</span>

          <a
            href="#message"
            onClick={(e) => smoothScrollTo(e, "message")}
            className="invitation-scroll"
          >
            {isArabic ? "اكتشفوا الدعوة" : "SCROLL TO DISCOVER"}
            <span>↓</span>
          </a>
        </motion.div>
      </section>

      {/* Invitation Message */}
      <div id="message">
        <InvitationMessage language={language} />
      </div>

      {/* Countdown */}
      <Countdown language={language} />

      {/* Event Details */}
      <EventDetails language={language} />

      {/* RSVP */}
      <RSVP language={language} />

      {/* Footer */}
      <footer className="invitation-footer">
        <div className="hero-ornament">✧ ❦ ✧</div>

        <h2>
          Omar <span>&</span> Aya
        </h2>

        <p>26 NOVEMBER 2026</p>

        <span>{isArabic ? "صُنعت بكل حب" : "MADE WITH LOVE"} ♡</span>
      </footer>
    </div>
  );
}