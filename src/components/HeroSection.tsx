export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden">
      {/* Background vignette wrapper */}
      <div className="absolute inset-0 z-0 bg-radial-[50%_50%_at_50%_50%] from-black/0 to-black/80 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center animate-fade-in text-center px-4 max-w-4xl">
        {/* Main Title */}
        <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl tracking-wide text-[var(--text)] mb-6 drop-shadow-lg">
          V12 ASCENSION
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-[var(--gold)] tracking-[0.3em] text-xs md:text-sm uppercase mb-4 opacity-80">
          Precision Engineering — Scroll to Explore
        </p>

        {/* Gold Divider Line */}
        <div className="w-[120px] h-[2px] bg-[var(--gold)] opacity-80" />
      </div>

      {/* Down arrow pulsing */}
      <div className="absolute bottom-12 flex flex-col items-center z-10 opacity-50 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .bg-radial-\\[50\\%_50\\%_at_50\\%_50\\%\\] {
          background-image: radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}
