export function LandingFooter() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-semibold tracking-[0.15em] uppercase">VONKAM</span>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300 lift-hover">
              Instagram
            </a>
            <a href="mailto:hello@vonkam.com" className="hover:text-foreground transition-colors duration-300 lift-hover">
              hello@vonkam.com
            </a>
          </div>
          <p className="text-xs text-muted-foreground/50">&copy; 2025 VONKAM</p>
        </div>
      </div>
    </footer>
  );
}
