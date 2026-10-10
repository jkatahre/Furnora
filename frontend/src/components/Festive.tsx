import { useEffect, useState } from "react";
import { store } from "../config/store";

/** True while the festival sale is switched on and hasn't ended. */
export function festivalLive(now = Date.now()): boolean {
  const { festival } = store;
  return festival.active && now < new Date(festival.endsAt).getTime();
}

/** Days, hours and minutes left in the sale; updates every minute. */
export function useCountdown(endsAt: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);
  const ms = Math.max(0, new Date(endsAt).getTime() - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    ended: ms === 0,
  };
}

/** A marigold toran (door garland) that repeats across its width. */
export function Toran({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none block w-full ${className}`} height="46" aria-hidden="true">
      <defs>
        <pattern id="toran" width="56" height="46" patternUnits="userSpaceOnUse">
          {/* string */}
          <path d="M0 4 Q28 14 56 4" fill="none" stroke="#c2410c" strokeWidth="1.5" />
          {/* long strand */}
          <line x1="28" y1="9" x2="28" y2="34" stroke="#9a3412" strokeWidth="1" />
          <circle cx="28" cy="14" r="5" fill="#f59e0b" />
          <circle cx="28" cy="14" r="2.2" fill="#ea580c" />
          <circle cx="28" cy="24" r="5" fill="#fbbf24" />
          <circle cx="28" cy="24" r="2.2" fill="#f59e0b" />
          <path d="M28 30 q5 6 0 14 q-5 -8 0 -14z" fill="#3f7d20" />
          {/* short strand */}
          <line x1="0" y1="4" x2="0" y2="16" stroke="#9a3412" strokeWidth="1" />
          <circle cx="0" cy="11" r="4.5" fill="#ea580c" />
          <circle cx="56" cy="11" r="4.5" fill="#ea580c" />
          <path d="M0 16 q4 5 0 11 q-4 -6 0 -11z" fill="#4d8b2a" />
          <path d="M56 16 q4 5 0 11 q-4 -6 0 -11z" fill="#4d8b2a" />
        </pattern>
      </defs>
      <rect width="100%" height="46" fill="url(#toran)" />
    </svg>
  );
}

/** A clay diya with a flickering flame. */
export function Diya({ size = 56, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="overflow-visible">
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-clay" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="22" r="22" fill="url(#diya-glow)" className="origin-[32px_22px] animate-[glow_2.4s_ease-in-out_infinite]" style={{ animationDelay: `${delay}s` }} />
      <path
        d="M32 8 C36 15 38 20 32 28 C26 20 28 15 32 8Z"
        fill="#fbbf24"
        className="origin-[32px_28px] animate-[flicker_1.6s_ease-in-out_infinite]"
        style={{ animationDelay: `${delay}s` }}
      />
      <path d="M32 15 C34 19 34 22 32 26 C30 22 30 19 32 15Z" fill="#fff7d6" />
      <path d="M6 34 Q32 30 58 34 Q54 52 32 54 Q10 52 6 34Z" fill="url(#diya-clay)" />
      <path d="M6 34 Q32 38 58 34" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
      <path d="M14 42 h36" stroke="#fcd34d" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  );
}

/** Small gold sparkles scattered over a banner. */
export function Sparkles() {
  const dots = [
    [12, 18, 0],
    [78, 12, 0.8],
    [64, 30, 1.6],
    [88, 44, 0.4],
    [30, 8, 1.2],
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map(([x, y, d]) => (
        <span
          key={`${x}-${y}`}
          className="absolute h-1.5 w-1.5 animate-[twinkle_2.8s_ease-in-out_infinite] rounded-full bg-gold shadow-[0_0_8px_2px_rgb(242_178_51/0.7)]"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
        />
      ))}
    </div>
  );
}
