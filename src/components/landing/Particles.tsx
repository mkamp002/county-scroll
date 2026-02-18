import { useEffect, useRef } from "react";

export function Particles({ count = 20 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "particle";
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${30 + Math.random() * 60}%`;
      el.style.animationDuration = `${6 + Math.random() * 8}s`;
      el.style.animationDelay = `${Math.random() * 10}s`;
      el.style.width = `${1 + Math.random()}px`;
      el.style.height = el.style.width;
      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return <div ref={ref} className="particles-container" />;
}
