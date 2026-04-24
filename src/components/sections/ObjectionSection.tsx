"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Smartphone, FileSearch, MessageCircle } from "lucide-react";

const objections = [
  {
    icon: ShieldCheck,
    worry: "Không được chi trả?",
    answer:
      "Có bảo lãnh trực tiếp tại bệnh viện liên kết. Generali thanh toán cho bệnh viện, bạn không cần ứng tiền.",
    color: "text-trust-green",
    bg: "bg-trust-green/10",
  },
  {
    icon: Smartphone,
    worry: "Thủ tục rắc rối?",
    answer:
      "App GenVita hỗ trợ toàn bộ quy trình. Tư vấn viên cá nhân xử lý mọi thủ tục cho bạn.",
    color: "text-generali-gold",
    bg: "bg-generali-gold/10",
  },
  {
    icon: FileSearch,
    worry: "Lo bị loại trừ?",
    answer:
      "Được tư vấn rõ ràng về phạm vi bảo hiểm trước khi tham gia. Không có điều khoản ẩn.",
    color: "text-generali-red-light",
    bg: "bg-generali-red/10",
  },
];

export default function ObjectionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="objections"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.10_0.01_260)] to-background" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-generali-red/10 text-generali-red-light text-xs font-medium mb-6">
            <MessageCircle className="w-3.5 h-3.5" />
            Giải đáp lo lắng
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
            Khách hàng thường{" "}
            <span className="gradient-text-red">lo điều này…</span>
          </h2>
        </div>

        {/* Objection cards */}
        <div className="space-y-5">
          {objections.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <div
                key={i}
                className="reveal glass-card rounded-2xl p-6 lg:p-8"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div
                    className={`w-14 h-14 rounded-2xl ${obj.bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-7 h-7 ${obj.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <p className="text-lg font-bold text-text-primary">
                        &ldquo;{obj.worry}&rdquo;
                      </p>
                      <div className="hidden sm:block w-8 h-px bg-[oklch(1_0_0/20%)]" />
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      → {obj.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
