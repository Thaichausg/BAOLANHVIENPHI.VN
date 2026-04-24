"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies, hospitalPartners } from "@/lib/data";
import {
  Star,
  Quote,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [logoOffset, setLogoOffset] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto scroll logo carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoOffset((prev) => (prev + 1) % hospitalPartners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentCase = caseStudies[activeCase];

  function formatVND(amount: number) {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  }

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.01_260)] to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-generali-gold/10 text-generali-gold text-xs font-medium mb-6">
            <Star className="w-3.5 h-3.5" />
            Bằng chứng thật
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-4">
            Khách hàng thật –{" "}
            <span className="gradient-text">chi trả thật</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Những câu chuyện thực tế từ khách hàng đã sử dụng bảo lãnh viện phí Generali
          </p>
        </div>

        {/* Case study card */}
        <div className="reveal max-w-4xl mx-auto mb-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left - Bill image placeholder */}
              <div className="relative bg-gradient-to-br from-[oklch(0.18_0.01_260)] to-[oklch(0.14_0.01_260)] p-8 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-full max-w-[240px] aspect-[3/4] rounded-xl bg-[oklch(1_0_0/5%)] border border-[oklch(1_0_0/10%)] flex flex-col items-center justify-center gap-4 p-6">
                  <FileCheck className="w-12 h-12 text-text-muted" />
                  <div className="text-center">
                    <p className="text-xs text-text-muted mb-1">Hóa đơn viện phí</p>
                    <p className="text-xs text-text-muted italic">(Thông tin đã được bảo mật)</p>
                  </div>
                  {/* Simulated blur lines */}
                  <div className="w-full space-y-2">
                    <div className="h-2 bg-[oklch(1_0_0/8%)] rounded blur-[2px]" />
                    <div className="h-2 bg-[oklch(1_0_0/6%)] rounded blur-[2px] w-3/4" />
                    <div className="h-2 bg-[oklch(1_0_0/8%)] rounded blur-[2px] w-5/6" />
                    <div className="h-2 bg-generali-red/20 rounded blur-[1px]" />
                    <div className="h-2 bg-[oklch(1_0_0/6%)] rounded blur-[2px] w-2/3" />
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-4 text-center">
                  📋 Hóa đơn thật • Thông tin đã blur bảo mật
                </p>
              </div>

              {/* Right - Case details */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-generali-red to-generali-red-light flex items-center justify-center text-white font-bold text-lg">
                    {currentCase.name.charAt(currentCase.name.length - 1)}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{currentCase.name}</p>
                    <p className="text-xs text-text-muted">
                      {currentCase.age} tuổi – {currentCase.city} – {currentCase.procedure}
                    </p>
                  </div>
                </div>

                {/* HIGHLIGHT: Savings summary card */}
                <div className="bg-gradient-to-r from-trust-green/15 to-trust-green/5 rounded-xl p-5 mb-5 border border-trust-green/20 relative overflow-hidden">
                  <div className="absolute top-2 right-3 text-4xl opacity-10">💰</div>
                  <p className="text-xs text-trust-green font-medium mb-1">Generali đã chi trả</p>
                  <p className="text-3xl font-extrabold text-trust-green">
                    {formatVND(currentCase.covered)}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    trên tổng {formatVND(currentCase.totalBill)} viện phí
                  </p>
                </div>

                {/* Financial breakdown */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between items-center py-2 border-b border-[oklch(1_0_0/8%)]">
                    <span className="text-sm text-text-secondary">Tổng viện phí</span>
                    <span className="text-sm font-bold text-text-primary">
                      {formatVND(currentCase.totalBill)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-trust-green/20 bg-trust-green/5 -mx-2 px-2 rounded">
                    <span className="text-sm text-trust-green font-medium">✅ Generali chi trả</span>
                    <span className="text-sm font-bold text-trust-green">
                      {formatVND(currentCase.covered)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-text-secondary">Khách chỉ trả</span>
                    <span className="text-sm font-bold text-generali-gold">
                      {formatVND(currentCase.paid)}
                    </span>
                  </div>
                </div>

                {/* Coverage percentage */}
                <div className="bg-[oklch(1_0_0/3%)] rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted">Tỷ lệ chi trả</span>
                    <span className="text-2xl font-extrabold text-trust-green">
                      {Math.round((currentCase.covered / currentCase.totalBill) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[oklch(1_0_0/10%)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-trust-green to-trust-green-light rounded-full transition-all duration-1000"
                      style={{
                        width: `${(currentCase.covered / currentCase.totalBill) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quote */}
                <div className="relative bg-[oklch(1_0_0/3%)] rounded-xl p-4">
                  <Quote className="w-5 h-5 text-generali-gold/40 absolute top-3 left-3" />
                  <p className="text-sm text-text-secondary italic pl-6 leading-relaxed">
                    &ldquo;{currentCase.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case navigation */}
          {caseStudies.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  setActiveCase((prev) =>
                    prev === 0 ? caseStudies.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-text-primary transition cursor-pointer"
                aria-label="Xem case trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveCase(i)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    i === activeCase
                      ? "bg-generali-red scale-125"
                      : "bg-[oklch(1_0_0/20%)] hover:bg-[oklch(1_0_0/30%)]"
                  }`}
                  aria-label={`Xem case ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setActiveCase((prev) =>
                    prev === caseStudies.length - 1 ? 0 : prev + 1
                  )
                }
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-text-primary transition cursor-pointer"
                aria-label="Xem case tiếp"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Video testimonial placeholder */}
        <div className="reveal mb-16">
          <h3 className="text-lg font-bold text-text-primary text-center mb-8">
            Khách hàng chia sẻ
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {["Chị Thanh – TP.HCM", "Anh Hùng – Hà Nội", "Chị Mai – Đà Nẵng"].map(
              (name, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-generali-red/20 flex items-center justify-center group-hover:bg-generali-red/30 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 text-generali-red-light ml-1" />
                  </div>
                  <p className="text-xs text-text-muted">{name}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Hospital partners carousel */}
        <div className="reveal">
          <h3 className="text-lg font-bold text-text-primary text-center mb-8">
            Bệnh viện liên kết
          </h3>
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{
                transform: `translateX(-${logoOffset * 140}px)`,
              }}
            >
              {[...hospitalPartners, ...hospitalPartners].map((hospital, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl px-6 py-4 flex items-center gap-3 min-w-[180px] shrink-0"
                >
                  <span className="text-2xl">{hospital.logo}</span>
                  <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                    {hospital.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-text-muted mt-4">
            và 460+ bệnh viện, phòng khám trên toàn quốc
          </p>
        </div>
      </div>
    </section>
  );
}
