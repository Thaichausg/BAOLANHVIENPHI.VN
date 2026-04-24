"use client";

import { useEffect, useRef } from "react";
import { Check, X, AlertTriangle, Trophy } from "lucide-react";

const comparisonData = [
  {
    criteria: "Bảo lãnh viện phí",
    generali: true,
    other: false,
  },
  {
    criteria: "App quản lý quyền lợi",
    generali: true,
    other: false,
  },
  {
    criteria: "Hỗ trợ 24/7",
    generali: true,
    other: "partial",
  },
  {
    criteria: "Claim online",
    generali: true,
    other: "partial",
  },
  {
    criteria: "400+ bệnh viện liên kết",
    generali: true,
    other: false,
  },
  {
    criteria: "Thẻ bảo hiểm điện tử",
    generali: true,
    other: false,
  },
  {
    criteria: "Tư vấn viên cá nhân",
    generali: true,
    other: "partial",
  },
];

export default function ComparisonSection() {
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
      id="comparison"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[oklch(0.10_0.01_260)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-generali-gold/10 text-generali-gold text-xs font-medium mb-6">
            <Trophy className="w-3.5 h-3.5" />
            So sánh khách quan
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-4">
            Vì sao chọn{" "}
            <span className="gradient-text">Generali?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            So sánh quyền lợi bảo lãnh viện phí với các giải pháp khác trên thị trường
          </p>
        </div>

        {/* Comparison table */}
        <div className="reveal glass-card rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-[oklch(1_0_0/3%)] border-b border-[oklch(1_0_0/8%)]">
            <div className="text-sm font-bold text-text-muted">Tiêu chí</div>
            <div className="text-sm font-bold text-generali-red-light text-center">
              Generali
            </div>
            <div className="text-sm font-bold text-text-muted text-center">
              Hãng khác
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 gap-4 p-5 items-center ${
                i < comparisonData.length - 1
                  ? "border-b border-[oklch(1_0_0/5%)]"
                  : ""
              } hover:bg-[oklch(1_0_0/3%)] transition-colors`}
            >
              <span className="text-sm text-text-secondary">{row.criteria}</span>
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-trust-green/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-trust-green" />
                </div>
              </div>
              <div className="flex justify-center">
                {row.other === false ? (
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-generali-gold/15 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-generali-gold" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-text-muted mt-4">
          * So sánh dựa trên quyền lợi phổ biến. Chi tiết có thể khác theo từng sản phẩm cụ thể.
        </p>
      </div>
    </section>
  );
}
