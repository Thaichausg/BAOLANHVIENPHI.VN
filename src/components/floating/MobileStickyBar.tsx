"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (85vh ≈ 600px)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient fade */}
      <div className="h-4 bg-gradient-to-t from-background to-transparent" />
      
      <div className="bg-background/95 backdrop-blur-xl border-t border-[oklch(1_0_0/8%)] px-4 py-3 flex items-center gap-3">
        <button
          onClick={handleCTA}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-lg hover:shadow-generali-red/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 pulse-cta"
          type="button"
        >
          Xem phí phù hợp NGAY
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <a
          href="tel:1900545453"
          className="w-12 h-12 rounded-xl bg-[oklch(1_0_0/8%)] flex items-center justify-center text-generali-red-light hover:bg-[oklch(1_0_0/12%)] transition shrink-0"
          aria-label="Gọi tư vấn"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
