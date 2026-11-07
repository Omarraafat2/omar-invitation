"use client";

import { useRef, useState } from "react";
import OpeningScene from "@/components/OpeningScene";
import MainInvitation from "@/components/MainInvitation";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedMusic = useRef(false);

  const handleStartMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Start from 39 seconds only the first time.
    if (!hasStartedMusic.current) {
      audio.currentTime = 39;
      hasStartedMusic.current = true;
    }

    audio.volume = 1;
    audio.muted = false;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  const handleToggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    await handleStartMusic();
  };

  return (
    <div>
      {/* Persistent Background Music */}
      <audio
        ref={audioRef}
        src="/audio/our-song.mp3"
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          console.error("Audio loading error:", audioRef.current?.error);
        }}
      />

      {!isOpened ? (
        <OpeningScene
          onStartMusic={handleStartMusic}
          onToggleMusic={handleToggleMusic}
          isPlaying={isPlaying}
          onOpen={() => setIsOpened(true)}
        />
      ) : (
        <MainInvitation />
      )}
    </div>
  );
}