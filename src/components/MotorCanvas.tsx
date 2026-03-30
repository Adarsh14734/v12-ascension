"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function MotorCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [milestone, setMilestone] = useState("Crankshaft & Block");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Images
  useEffect(() => {
    let loadedImages = 0;
    const TOTAL_FRAMES = 30;
    const loadedArray: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = (i + 1).toString().padStart(3, "0");
      img.src = `/v12-ascension/engine2/${idx}.png`;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === TOTAL_FRAMES) {
          setImages(loadedArray);
          setIsLoaded(true);
        }
      };
      loadedArray.push(img);
    }
  }, []);

  const drawFrame = useCallback((idx: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[idx];
    if (!img) return;

    // Responsive Canvas dimensions maintaining ratio
    const width = document.documentElement.clientWidth < 768 ? document.documentElement.clientWidth * 0.92 : document.documentElement.clientWidth * 0.68;
    // Calculate aspect ratio. Native image seems roughly square or landscape, wait we don't know the exact pixel dims, but we can read it from the image object.
    const aspect = img.width / img.height;
    const height = width / aspect;
    
    // Set actual canvas pixels to match
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [images]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Scroll listener logic
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          const scrollableDistance = rect.height - window.innerHeight;
          // rect.top negative means we scrolled past the top
          // clamp it between 0 and 1
          let progress = -rect.top / scrollableDistance;
          progress = Math.min(1, Math.max(0, progress));

          let frameIndex = Math.round(progress * 29);
          frameIndex = Math.min(29, Math.max(0, frameIndex));

          if (frameIndex !== currentFrameIndex) {
            setCurrentFrameIndex(frameIndex);
            drawFrame(frameIndex);

            // Update milestone label
            if (frameIndex <= 7) setMilestone("Crankshaft & Block");
            else if (frameIndex <= 14) setMilestone("Pistons & Rods");
            else if (frameIndex <= 21) setMilestone("Cylinder Head");
            else if (frameIndex <= 27) setMilestone("Intake & Exhaust");
            else setMilestone("Complete");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Add resize listener to redraw correct size
    window.addEventListener("resize", () => {
        window.requestAnimationFrame(() => drawFrame(currentFrameIndex));
    }, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoaded, currentFrameIndex, drawFrame]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[var(--bg)]">
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 z-0 opacity-40" style={{ 
          background: "radial-gradient(circle at center, transparent 30%, #0A0A0A 80%)" 
        }} />

        <canvas
          ref={canvasRef}
          className="relative z-10 mx-auto"
          style={{ 
             maxWidth: '92vw', 
             /* We control size directly in JS but fallback max here */
          }}
        />

        {/* Top-left exact miniature loading bar (which frame we're on) */}
        <div className="absolute top-8 left-8 z-20 w-[60px] md:w-[100px] h-[1px] bg-[var(--gold-ghost)]">
          <div 
            className="h-full bg-[var(--gold)] transition-transform duration-[50ms] ease-linear origin-left"
            style={{ transform: `scaleX(${currentFrameIndex / 29})` }}
          />
        </div>

        {/* Bottom-right milestone label */}
        <div className="absolute bottom-12 right-12 z-20 text-right">
          <p 
            key={milestone} 
            className="font-mono text-xs md:text-sm text-[var(--text)] uppercase tracking-widest opacity-80 animate-label-fade-in"
          >
            {milestone}
          </p>
          <div className="w-[40px] h-[1px] bg-[var(--gold)] mt-2 ml-auto" />
        </div>
      </div>
      <style jsx>{`
        @keyframes label-fade-in {
          0% { opacity: 0; }
          100% { opacity: 0.8; }
        }
        .animate-label-fade-in {
          animation: label-fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
