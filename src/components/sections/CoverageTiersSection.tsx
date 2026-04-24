"use client";

import { useEffect, useRef } from "react";
import {
  Shield,
  ArrowRight,
  Crown,
  Gem,
  Star,
  TrendingUp,
  Layers,
} from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const tiers = [
  {
    id: "saving",
    name: "Tiết kiệm",
    limit: "120 triệu",
    limitNum: 120,
    description: "Phù hợp nhu cầu bảo vệ cơ bản khi nhập viện",
    tag: "Khởi đầu",
    icon: Shield,
    tier: "basic" as const,
    glow: false,
    recommended: false,
  },
  {
    id: "standard",
    name: "Tiêu chuẩn",
    limit: "350 triệu",
    limitNum: 350,
    description: "Cân bằng giữa chi phí và quyền lợi",
    tag: "Phổ biến",
    icon: Star,
    tier: "basic" as const,
    glow: false,
    recommended: true,
  },
  {
    id: "premium",
    name: "Cao cấp",
    limit: "650 triệu",
    limitNum: 650,
    description: "Phù hợp gia đình muốn mức an tâm cao hơn",
    tag: "Được chọn nhiều",
    icon: TrendingUp,
    tier: "advanced" as const,
    glow: false,
    recommended: true,
  },
  {
    id: "vip",
    name: "VIP",
    limit: "1,4 tỷ",
    limitNum: 1400,
    description: "Bảo vệ tốt hơn trước các chi phí điều trị lớn",
    tag: "Nâng cao",
    icon: Crown,
    tier: "advanced" as const,
    glow: false,
    recommended: false,
  },
  {
    id: "diamond",
    name: "Kim cương",
    limit: "5 tỷ",
    limitNum: 5000,
    description: "Mức bảo vệ cao nhất cho nhu cầu chăm sóc sức khỏe cao cấp",
    tag: "Tối đa",
    icon: Gem,
    tier: "advanced" as const,
    glow: true,
    recommended: false,
  },
];

export default function CoverageTiersSection() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleTierClick = (tier: typeof tiers[number]) => {
    trackEvent({
      event: "tier_select",
      event_category: "engagement",
      event_label: tier.id,
      value: tier.limitNum,
    });

    // Dispatch custom event for HeroSection calculator to auto-select tier
    window.dispatchEvent(
      new CustomEvent("tierSelect", {
        detail: {
          tierId: tier.id,
          tierName: tier.name,
          tierLimit: tier.limit,
        },
      })
    );

    // Scroll to calculator
    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tiers"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[oklch(0.11_0.01_260)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-generali-gold/10 text-generali-gold text-xs font-medium mb-6">
            <Layers className="w-3.5 h-3.5" />
            Hạng mức bảo vệ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-4">
            Chọn hạng mức bảo vệ{" "}
            <span className="gradient-text">phù hợp</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Không có gói tốt nhất cho tất cả mọi người — chỉ có mức bảo vệ phù hợp
            với nhu cầu và tài chính của từng gia đình.
          </p>
        </div>

        {/* ===== DESKTOP: 5 cards grid ===== */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 mb-10 reveal">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => handleTierClick(tier)}
                className={`glass-card rounded-2xl p-5 flex flex-col items-center text-center relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group ${
                  tier.glow
                    ? "border border-generali-gold/30 shadow-lg shadow-generali-gold/5"
                    : tier.recommended
                    ? "border border-generali-red/20"
                    : ""
                }`}
              >
                {/* Tag */}
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold mb-4 ${
                    tier.glow
                      ? "bg-generali-gold/15 text-generali-gold"
                      : tier.recommended
                      ? "bg-generali-red/15 text-generali-red-light"
                      : "bg-[oklch(1_0_0/5%)] text-text-muted"
                  }`}
                >
                  {tier.tag}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    tier.glow
                      ? "bg-generali-gold/15"
                      : tier.recommended
                      ? "bg-generali-red/15"
                      : "bg-[oklch(1_0_0/5%)]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      tier.glow
                        ? "text-generali-gold"
                        : tier.recommended
                        ? "text-generali-red-light"
                        : "text-text-secondary"
                    }`}
                  />
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-text-primary mb-2">
                  {tier.name}
                </h3>

                {/* Limit */}
                <p
                  className={`text-xl font-extrabold mb-1 ${
                    tier.glow
                      ? "text-generali-gold"
                      : tier.recommended
                      ? "gradient-text"
                      : "text-text-primary"
                  }`}
                >
                  {tier.limit}
                </p>
                <p className="text-[10px] text-text-muted mb-3">/ năm</p>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed flex-1 mb-4">
                  {tier.description}
                </p>

                {/* CTA hint */}
                <span className="inline-flex items-center gap-1 text-[11px] text-text-muted group-hover:text-generali-red-light transition-colors">
                  Xem phí
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== MOBILE: Horizontal scroll ===== */}
        <div className="lg:hidden mb-10 reveal">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierClick(tier)}
                  className={`glass-card rounded-xl p-5 flex flex-col items-center text-center min-w-[200px] snap-center shrink-0 cursor-pointer transition-all active:scale-95 ${
                    tier.glow
                      ? "border border-generali-gold/30"
                      : tier.recommended
                      ? "border border-generali-red/20"
                      : ""
                  }`}
                >
                  {/* Tag */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold mb-3 ${
                      tier.glow
                        ? "bg-generali-gold/15 text-generali-gold"
                        : tier.recommended
                        ? "bg-generali-red/15 text-generali-red-light"
                        : "bg-[oklch(1_0_0/5%)] text-text-muted"
                    }`}
                  >
                    {tier.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      tier.glow
                        ? "bg-generali-gold/15"
                        : tier.recommended
                        ? "bg-generali-red/15"
                        : "bg-[oklch(1_0_0/5%)]"
                    }`}
                  >
                    <Icon
                      className={`w-4.5 h-4.5 ${
                        tier.glow
                          ? "text-generali-gold"
                          : tier.recommended
                          ? "text-generali-red-light"
                          : "text-text-secondary"
                      }`}
                    />
                  </div>

                  {/* Name + Limit */}
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    {tier.name}
                  </h3>
                  <p
                    className={`text-lg font-extrabold mb-0.5 ${
                      tier.glow
                        ? "text-generali-gold"
                        : tier.recommended
                        ? "gradient-text"
                        : "text-text-primary"
                    }`}
                  >
                    {tier.limit}
                  </p>
                  <p className="text-[9px] text-text-muted mb-2">/ năm</p>

                  {/* Description */}
                  <p className="text-[11px] text-text-secondary leading-relaxed mb-3">
                    {tier.description}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1 text-[10px] text-generali-red-light font-medium">
                    Xem phí
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              );
            })}
          </div>
          {/* Scroll hint */}
          <p className="text-center text-[10px] text-text-muted mt-1">
            ← Vuốt ngang để xem thêm →
          </p>
        </div>

        {/* Guidance */}
        <div className="reveal mb-8">
          <div className="glass-card rounded-xl p-4 max-w-2xl mx-auto text-center">
            <p className="text-sm text-text-secondary leading-relaxed">
              💡 Phần lớn khách hàng gia đình thường cân nhắc mức{" "}
              <span className="font-semibold text-generali-gold">350 – 650 triệu</span>{" "}
              để cân bằng chi phí và quyền lợi.
            </p>
          </div>
        </div>

        {/* Compliance */}
        <div className="reveal mb-12">
          <p className="text-center text-[11px] text-text-muted max-w-3xl mx-auto leading-relaxed">
            ⚠️ Hạn mức trên là tổng quyền lợi tối đa trong năm. Quyền lợi chi tiết,
            phạm vi bảo vệ, mức chi trả, thời gian chờ và loại trừ áp dụng theo điều khoản
            sản phẩm và gói bảo hiểm khách hàng tham gia.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <div className="glass-card rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
              Bạn phù hợp với hạng mức nào?
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Nhập thông tin cơ bản để xem phí tham khảo theo hạng mức.
            </p>
            <button
              onClick={() => {
                trackEvent({
                  event: "tier_cta_click",
                  event_category: "engagement",
                  event_label: "tiers_bottom_cta",
                });
                document.getElementById("calculator")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-sm bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-xl hover:shadow-generali-red/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer pulse-cta"
              type="button"
              id="tiers-cta"
            >
              Xem phí theo hạng mức này
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-text-muted mt-4">
              Hoàn toàn miễn phí – không yêu cầu cam kết.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
