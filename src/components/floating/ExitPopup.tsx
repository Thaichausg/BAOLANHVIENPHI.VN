"use client";

import { useState, useEffect } from "react";
import { X, Calculator, ArrowRight, Clock } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves top of viewport
      if (e.clientY <= 0 && !dismissed) {
        setIsVisible(true);
      }
    };

    // Add with delay to not annoy users
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000); // Wait 15s before enabling

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  const handleCTA = () => {
    trackEvent({
      event: "exit_popup_click",
      event_category: "engagement",
      event_label: "exit_popup_cta",
    });
    handleDismiss();
    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative glass-card rounded-2xl p-8 max-w-md w-full animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[oklch(1_0_0/10%)] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-[oklch(1_0_0/15%)] transition cursor-pointer"
          aria-label="Đóng"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-generali-red/15 flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-7 h-7 text-generali-red-light" />
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2">
            Chờ 5 giây ⏱️
          </h3>
          <p className="text-base font-semibold text-generali-gold mb-2">
            Xem phí phù hợp với bạn trước khi rời đi
          </p>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Chỉ cần chọn tuổi và số người – biết ngay phí hàng tháng.
            <br />
            <span className="text-text-muted text-xs flex items-center justify-center gap-1 mt-2">
              <Clock className="w-3 h-3" />
              Nhanh hơn đặt grab
            </span>
          </p>

          <button
            onClick={handleCTA}
            className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-xl hover:shadow-generali-red/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 pulse-cta"
            type="button"
          >
            Xem phí phù hợp với tôi NGAY
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="mt-4 text-xs text-text-muted hover:text-text-secondary transition cursor-pointer"
            type="button"
          >
            Không, cảm ơn – tôi đã biết rồi
          </button>
        </div>
      </div>
    </div>
  );
}
