"use client";

import { useState, useEffect } from "react";
import { X, Calculator, ArrowRight } from "lucide-react";

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
    handleDismiss();
    // Scroll to calculator
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

          <h3 className="text-xl font-bold text-text-primary mb-3">
            Chờ chút! 🤔
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Xem phí bảo hiểm phù hợp với bạn trước khi rời đi.
            <br />
            <span className="text-generali-gold font-medium">
              Chỉ mất 5 giây.
            </span>
          </p>

          <button
            onClick={handleCTA}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-xl hover:shadow-generali-red/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            type="button"
          >
            Xem phí phù hợp với tôi
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="mt-3 text-xs text-text-muted hover:text-text-secondary transition cursor-pointer"
            type="button"
          >
            Không, cảm ơn
          </button>
        </div>
      </div>
    </div>
  );
}
