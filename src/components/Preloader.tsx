"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const totalFrames = 30;
    let loadedCount = 0;

    const frameUrls = Array.from({ length: totalFrames }, (_, i) => {
      const idx = (i + 1).toString().padStart(3, "0");
      return `/v12-ascension/engine2/${idx}.png`;
    });

    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setProgress((loadedCount / totalFrames) * 100);
        if (loadedCount === totalFrames) {
          setTimeout(() => {
            setLoaded(true);
            setTimeout(onComplete, 400); // Wait for fade out
          }, 200);
        }
      };
      img.onerror = () => {
        // Handle error gracefully if a frame is missing
        loadedCount++;
        setProgress((loadedCount / totalFrames) * 100);
        if (loadedCount === totalFrames) {
          setLoaded(true);
          onComplete();
        }
      };
    });
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-[120px] h-[2px] bg-[#C8A96E]/20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#C8A96E] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#F0EDE8]/50">
        Initiating Sequence
      </p>
    </div>
  );
}
