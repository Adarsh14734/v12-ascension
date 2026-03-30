"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import MotorCanvas from "@/components/MotorCanvas";
import DetailsSection from "@/components/DetailsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollDepth(scrolled);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen">
      <Preloader onComplete={() => {}} />

      {/* Global Scroll Progress Bar Fixed to Top */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-[var(--gold-ghost)] pointer-events-none">
        <div 
          className="h-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)] transition-transform duration-[50ms] origin-left"
          style={{ transform: `scaleX(${scrollDepth / 100})` }}
        />
      </div>

      <HeroSection />
      
      {/* 
        Wait, I need to make sure MotorCanvas acts like a normal block 
        that users scroll through. MotorCanvas is 400vh tall, so it 
        takes up 4 viewports of scrolling distance naturally.
      */}
      <MotorCanvas />
      
      <DetailsSection />
      
      <Footer />
    </main>
  );
}
