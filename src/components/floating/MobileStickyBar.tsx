"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // Show after hero (600px), hide near bottom (footer/CTA area)
      const nearBottom = scrollY + viewportHeight > pageHeight - 400;
      setVisible(scrollY > 600 && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    trackEvent({
      event: "mobile_sticky_cta_click",
      event_category: "engagement",
      event_label: "mobile_sticky_bar",
    });

    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Gradient fade */}
      <div className="h-3 bg-gradient-to-t from-background to-transparent" />

      <div className="bg-background/95 backdrop-blur-xl border-t border-[oklch(1_0_0/8%)] px-4 py-2.5 flex items-center gap-3 safe-area-bottom">
        <button
          onClick={handleCTA}
          className="flex-1 h-12 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          type="button"
          id="mobile-sticky-cta"
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
