"use client";

import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  HelpCircle,
  FileWarning,
  ShieldAlert,
  ArrowDown,
} from "lucide-react";

const painPoints = [
  {
    icon: AlertTriangle,
    text: "Không đúng bệnh viện bảo lãnh",
    detail: "Nhiều người mua bảo hiểm nhưng đến bệnh viện không nằm trong danh sách liên kết",
  },
  {
    icon: HelpCircle,
    text: "Không hiểu quyền lợi",
    detail: "Quyền lợi phức tạp, không biết mình được chi trả những gì",
  },
  {
    icon: FileWarning,
    text: "Thủ tục phức tạp",
    detail: "Hồ sơ claim rắc rối, mất thời gian và công sức",
  },
  {
    icon: ShieldAlert,
    text: "Mua sai gói",
    detail: "Chọn gói không phù hợp, khi cần thì không đủ quyền lợi",
  },
];

export default function PainSection() {
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
      id="pain"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.10_0.01_260)] to-background" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium mb-6">
            <AlertTriangle className="w-3.5 h-3.5" />
            Vấn đề thực tế
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
            Vì sao nhiều người có bảo hiểm
            <br />
            <span className="gradient-text-red">vẫn phải tự trả tiền viện?</span>
          </h2>
        </div>

        {/* Pain points grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={i}
                className="reveal glass-card rounded-2xl p-6 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-1.5">
                      {point.text}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {point.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition */}
        <div className="text-center reveal">
          <div className="section-divider mb-8" />
          <div className="flex flex-col items-center gap-3">
            <ArrowDown className="w-5 h-5 text-generali-gold animate-bounce" />
            <p className="text-lg sm:text-xl text-text-secondary italic">
              Nhưng có một cách <span className="text-generali-gold font-semibold not-italic">đơn giản hơn</span>...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
