"use client";

import { useState, useEffect } from "react";
import { X, Calculator, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check sessionStorage – don't show again if already dismissed this session
    if (sessionStorage.getItem("exit_popup_dismissed") === "true") {
      setDismissed(true);
      return;
    }

    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setIsVisible(true);
      }
    };

    // Wait 15s before enabling to avoid annoying new visitors
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    sessionStorage.setItem("exit_popup_dismissed", "true");
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative glass-card rounded-2xl p-6 sm:p-8 max-w-sm w-full animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[oklch(1_0_0/10%)] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-[oklch(1_0_0/15%)] transition cursor-pointer"
          aria-label="Đóng"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-generali-red/15 flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-6 h-6 text-generali-red-light" />
          </div>

          <h3 className="text-lg font-bold text-text-primary mb-2">
            Xem phí trước khi rời đi?
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Nhập tuổi và số người để xem mức phí tham khảo phù hợp.
          </p>

          <button
            onClick={handleCTA}
            className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-lg hover:shadow-generali-red/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            type="button"
            id="exit-popup-cta"
          >
            Xem phí ngay
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="mt-3 py-2 text-sm text-text-muted hover:text-text-secondary transition cursor-pointer"
            type="button"
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
}
