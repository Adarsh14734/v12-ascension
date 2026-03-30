export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--gold)]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center text-[var(--gold-ghost)] font-mono text-xs uppercase tracking-widest">
        <span>V12 ASCENSION</span>
        <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
