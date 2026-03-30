"use client";

import { useEffect, useRef } from "react";

export default function DetailsSection() {
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-[40px]");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    blocksRef.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[var(--bg)] w-full text-[var(--text)] font-sans px-6 lg:px-24">
      {/* Block 1 — Overview */}
      <div
        ref={(el) => {
          if (el) blocksRef.current[0] = el;
        }}
        className="py-32 max-w-4xl mx-auto opacity-0 translate-y-[40px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <p className="font-mono text-xs text-[var(--gold)] uppercase tracking-widest mb-6">
          OVERVIEW
        </p>
        <p className="font-sans text-xl md:text-2xl leading-relaxed text-[#F0EDE8]">
          {/* TODO: insert motor description here */}
          Forged from aerospace-grade aluminum and meticulously balanced to within one thousandth of a gram, the V12 Ascension redefines automotive propulsion. Every cylinder bore, every valve train component is a testament to unyielding precision engineering.
        </p>
      </div>

      <div className="w-full h-[1px] bg-[rgba(200,169,110,0.25)]" />

      {/* Block 2 — Features */}
      <div
        ref={(el) => {
          if (el) blocksRef.current[1] = el;
        }}
        className="py-32 max-w-4xl mx-auto opacity-0 translate-y-[40px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <p className="font-mono text-xs text-[var(--gold)] uppercase tracking-widest mb-6">
          FEATURES
        </p>
        <ul className="space-y-4">
          {/* TODO: insert features list here */}
          <li className="font-mono text-sm leading-[1.8] flex items-start text-[#F0EDE8]">
            <span className="text-[var(--gold)] mr-4">—</span>
            Precision-machined billet aluminum block
          </li>
          <li className="font-mono text-sm leading-[1.8] flex items-start text-[#F0EDE8]">
            <span className="text-[var(--gold)] mr-4">—</span>
            Twin-scroll forced induction architecture
          </li>
          <li className="font-mono text-sm leading-[1.8] flex items-start text-[#F0EDE8]">
            <span className="text-[var(--gold)] mr-4">—</span>
            Titanium connecting rods & forged pistons
          </li>
          <li className="font-mono text-sm leading-[1.8] flex items-start text-[#F0EDE8]">
            <span className="text-[var(--gold)] mr-4">—</span>
            Dry sump lubrication system
          </li>
        </ul>
      </div>

      <div className="w-full h-[1px] bg-[rgba(200,169,110,0.25)]" />

      {/* Block 3 — Tech Specs */}
      <div
        ref={(el) => {
          if (el) blocksRef.current[2] = el;
        }}
        className="py-32 max-w-4xl mx-auto opacity-0 translate-y-[40px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <p className="font-mono text-xs text-[var(--gold)] uppercase tracking-widest mb-8">
          SPECIFICATIONS
        </p>
        <div className="flex flex-col">
          {/* TODO: insert specs here */}
          {[
            { label: "DISPLACEMENT", value: "6.5 Liters" },
            { label: "CYLINDERS", value: "V12, 60° Bank Angle" },
            { label: "MAX POWER", value: "850 HP @ 9,200 RPM" },
            { label: "MAX TORQUE", value: "720 Nm @ 6,800 RPM" },
            { label: "WEIGHT", value: "198 kg (Dry)" },
          ].map((spec, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-4 border-b border-[rgba(200,169,110,0.15)] last:border-0 hover:bg-[var(--gold-ghost)] transition-colors duration-300 -mx-4 px-4"
            >
              <span className="font-mono text-sm text-[var(--gold)] uppercase">{spec.label}</span>
              <span className="font-mono text-sm text-[#F0EDE8]">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
