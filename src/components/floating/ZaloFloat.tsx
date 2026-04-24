"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export default function ZaloFloat() {
  const zaloMessage = encodeURIComponent(
    "Tôi muốn xem phí bảo hiểm cho:\n- Tuổi: \n- Số người: "
  );

  const handleClick = () => {
    trackEvent({
      event: "zalo_click",
      event_category: "engagement",
      event_label: "zalo_float",
    });

    window.open(
      `https://zalo.me/0901234567?text=${zaloMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 lg:bottom-6 right-4 z-50 group cursor-pointer"
      id="zalo-float"
      aria-label="Chat qua Zalo"
      type="button"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-20" />

        {/* Button - 48px minimum touch target */}
        <div className="relative w-14 h-14 rounded-full bg-[#0068FF] flex items-center justify-center shadow-lg shadow-[#0068FF]/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#0068FF]/40 transition-all duration-300">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>

        {/* Label */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-[#0068FF] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
            Chat Zalo
          </div>
        </div>
      </div>
    </button>
  );
}
