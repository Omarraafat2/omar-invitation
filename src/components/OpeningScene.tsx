
"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Volume2 } from "lucide-react";

type OpeningSceneProps = {
  onOpen: () => void;
  onStartMusic: () => Promise<void>;
  onToggleMusic: () => Promise<void>;
  isPlaying: boolean;
};

export default function OpeningScene({
  onOpen,
  onStartMusic,
  onToggleMusic,
  isPlaying,
}: OpeningSceneProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const videoRef = useRef<HTMLVideoElement>(null);

  const isArabic = language === "ar";

  const handleOpen = async () => {
    if (isOpening) return;

    const video = videoRef.current;

    if (!video) return;

    // Always mute the opening video.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    // Start the background music from the parent.
    // Music continues playing after this component unmounts.
    const musicPromise = onStartMusic();

    // Start opening video silently.
    video.currentTime = 0;

    const videoPromise = video.play();

    setIsOpening(true);

    try {
      await Promise.all([musicPromise, videoPromise]);
    } catch (error) {
      console.error("Opening playback error:", error);

      if (video.paused) {
        setIsOpening(false);
      }
    }
  };

  const handleVideoEnd = () => {
    onOpen();
  };

  const toggleMusic = async () => {
    try {
      await onToggleMusic();
    } catch (error) {
      console.error("Unable to toggle music:", error);
    }
  };

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="opening"
        className="opening-scene"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 1 }}
        onClick={handleOpen}
        style={{ cursor: isOpening ? "default" : "pointer" }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          className="opening-scene__video"
          playsInline
          muted
          defaultMuted
          preload="auto"
          onEnded={handleVideoEnd}
        >
          <source src="/videos/opening.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="opening-scene__overlay" />

        {/* Controls */}
        <div className="opening-scene__controls">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleMusic();
            }}
            className="opening-scene__music"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Volume2 size={19} />
            ) : (
              <Music2 size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleLanguage();
            }}
            className="opening-scene__language"
          >
            {isArabic ? "EN" : "AR"}
          </button>
        </div>

        {/* Invitation Content */}
        {!isOpening && (
          <div
            className="opening-scene__content"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <motion.p
              className="opening-scene__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isArabic
                ? "بمشاركة عائلتينا"
                : "TOGETHER WITH OUR FAMILIES"}
            </motion.p>

            <motion.h1
              className="opening-scene__names"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Omar <span>&</span> Aya
            </motion.h1>

            <p className="opening-scene__subtitle">
              {isArabic
                ? "يسعدنا دعوتكم للاحتفال بخطوبتنا"
                : "YOU ARE CORDIALLY INVITED TO OUR ENGAGEMENT"}
            </p>

            <motion.button
              type="button"
              className="opening-scene__button"
              onClick={(event) => {
                event.stopPropagation();
                handleOpen();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              ✧{" "}
              {isArabic
                ? "اضغط لفتح الدعوة"
                : "Click the door to open"}{" "}
              ✧
            </motion.button>

            <p className="opening-scene__date">
              26 · 11 · 2026
            </p>
          </div>
        )}

        {/* Playing Message */}
        {isOpening && (
          <motion.div
            className="opening-scene__playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isArabic
              ? "لحظة جميلة تبدأ..."
              : "A beautiful moment begins..."}
          </motion.div>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
