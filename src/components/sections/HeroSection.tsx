"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorFormSchema, leadFormSchema, type LeadFormData } from "@/lib/schemas";
import { calculatePremium, formatCurrency, type CalculatorOutput } from "@/lib/calculator";
import { trackEvent } from "@/lib/tracking";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield,
  Phone,
  Calculator,
  ChevronRight,
  User,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  TrendingUp,
  Lock,
} from "lucide-react";

export default function HeroSection() {
  const [result, setResult] = useState<CalculatorOutput | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  const sectionRef = useRef<HTMLElement>(null);

  // Calculator form
  const [calcAge, setCalcAge] = useState(30);
  const [calcGender, setCalcGender] = useState<"male" | "female">("female");
  const [calcPeople, setCalcPeople] = useState(1);
  const [calcRegion, setCalcRegion] = useState<"hcm" | "hn" | "other">("hcm");

  // Lead form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  // Auto-calculate on any change
  const doCalculate = useCallback(() => {
    const data = calculatorFormSchema.safeParse({
      age: calcAge,
      gender: calcGender,
      people: calcPeople,
      region: calcRegion,
      plan: activeTab,
    });
    if (data.success) {
      setResult(calculatePremium(data.data));
    }
  }, [calcAge, calcGender, calcPeople, calcRegion, activeTab]);

  useEffect(() => {
    doCalculate();
  }, [doCalculate]);

  const onSubmitLead = async (data: LeadFormData) => {
    trackEvent({
      event: "form_submit",
      event_category: "form",
      event_label: "hero_form",
      value: 1,
    });
    trackEvent({
      event: "calculator_submit",
      event_category: "calculator",
      event_label: activeTab,
      value: result?.minMonthly,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Lead submitted:", data, "Calculator result:", result);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.02_260)] via-[oklch(0.10_0.01_260)] to-[oklch(0.08_0.01_280)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.22_25/8%),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.78_0.12_80/5%),transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 30%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 30%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
              <Shield className="w-4 h-4 text-generali-red" />
              <span className="text-text-secondary">
                Generali Việt Nam – Top 5 Bảo hiểm nhân thọ
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.15] tracking-tight">
              <span className="text-text-primary">
                Đi viện{" "}
              </span>
              <span className="gradient-text-red">
                KHÔNG cần
              </span>
              <br />
              <span className="text-text-primary">
                chuẩn bị tiền mặt
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
              Bảo lãnh viện phí Generali tại{" "}
              <span className="text-generali-gold font-semibold">460+ bệnh viện</span> |
              Hỗ trợ <span className="text-trust-green font-semibold">24/7</span>
            </p>

            {/* Dynamic personal line – KEY CONVERSION HOOK */}
            {result && (
              <div className="glass-card rounded-xl p-4 border-l-4 border-l-generali-gold">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-generali-gold mt-0.5 shrink-0 animate-float" />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-text-primary leading-relaxed">
                      {result.personalLine}
                    </p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Dựa trên hồ sơ khách hàng tương tự tại {calcRegion === "hcm" ? "TP.HCM" : calcRegion === "hn" ? "Hà Nội" : "khu vực của bạn"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[11px] text-text-muted max-w-lg leading-relaxed">
              ⚠️ Quyền lợi áp dụng theo điều khoản sản phẩm và danh sách bệnh viện liên kết. Liên hệ tư vấn viên để được giải thích chi tiết.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { label: "Bệnh viện liên kết", value: "460+" },
                { label: "Khách hàng tin dùng", value: "2M+" },
                { label: "Năm kinh nghiệm", value: "18+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Calculator + Form */}
          <div className="space-y-6">
            {/* Calculator card */}
            <div className="glass-card rounded-2xl p-6 lg:p-8" id="calculator">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-generali-red/20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-generali-red" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    Tính phí bảo hiểm
                  </h2>
                  <p className="text-xs text-text-muted">
                    Kết quả tham khảo • Báo giá chính xác trong 30s
                  </p>
                </div>
              </div>

              {/* Plan tabs */}
              <div className="flex bg-[oklch(1_0_0/5%)] rounded-xl p-1 mb-6">
                {(["basic", "advanced"] as const).map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setActiveTab(plan)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeTab === plan
                        ? "bg-generali-red text-white shadow-lg shadow-generali-red/25"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {plan === "basic" ? "Cơ bản" : "Nâng cao"}
                  </button>
                ))}
              </div>

              {/* Calculator inputs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label className="text-xs text-text-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Tuổi
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={65}
                      value={calcAge}
                      onChange={(e) => setCalcAge(Number(e.target.value))}
                      className="flex-1 accent-generali-red h-1.5"
                      id="calc-age"
                    />
                    <span className="text-sm font-bold text-text-primary w-8 text-right">
                      {calcAge}
                    </span>
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-xs text-text-muted">Giới tính</Label>
                  <div className="flex gap-2">
                    {(["female", "male"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setCalcGender(g)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          calcGender === g
                            ? "bg-generali-red/20 text-generali-red-light border border-generali-red/30"
                            : "bg-[oklch(1_0_0/5%)] text-text-secondary border border-transparent hover:border-[oklch(1_0_0/10%)]"
                        }`}
                      >
                        {g === "female" ? "Nữ" : "Nam"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* People count */}
                <div className="space-y-2">
                  <Label className="text-xs text-text-muted flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Số người
                  </Label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcPeople(Math.max(1, calcPeople - 1))}
                      className="w-8 h-8 rounded-lg bg-[oklch(1_0_0/5%)] text-text-secondary hover:bg-[oklch(1_0_0/10%)] transition cursor-pointer flex items-center justify-center"
                    >
                      –
                    </button>
                    <span className="text-sm font-bold text-text-primary w-6 text-center">
                      {calcPeople}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCalcPeople(Math.min(10, calcPeople + 1))}
                      className="w-8 h-8 rounded-lg bg-[oklch(1_0_0/5%)] text-text-secondary hover:bg-[oklch(1_0_0/10%)] transition cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label className="text-xs text-text-muted flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Khu vực
                  </Label>
                  <select
                    value={calcRegion}
                    onChange={(e) => setCalcRegion(e.target.value as "hcm" | "hn" | "other")}
                    className="w-full py-2 px-3 rounded-lg bg-[oklch(1_0_0/5%)] text-sm text-text-primary border border-[oklch(1_0_0/8%)] focus:border-generali-red/50 focus:outline-none transition cursor-pointer"
                    id="calc-region"
                  >
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="other">Tỉnh khác</option>
                  </select>
                </div>
              </div>

              {/* Result – CONVERSION ZONE */}
              {result && (
                <div className="bg-gradient-to-r from-generali-red/10 to-generali-gold/10 rounded-xl p-5 mb-6 border border-generali-red/20 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer pointer-events-none" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-text-muted">Khoảng phí ước tính</span>
                      {result.badge && (
                        <Badge className="bg-generali-gold/20 text-generali-gold border-generali-gold/30 text-xs animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          {result.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold gradient-text">
                        ~{formatCurrency(result.minMonthly)} – {formatCurrency(result.maxMonthly)}
                      </span>
                      <span className="text-sm text-text-muted">/tháng</span>
                    </div>
                    <p className="text-xs text-text-muted mt-2">
                      ≈ {formatCurrency(result.minYearly)} – {formatCurrency(result.maxYearly)}/năm
                      {calcPeople > 1 && " • Đã áp dụng ưu đãi nhóm"}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[oklch(1_0_0/8%)]">
                      <TrendingUp className="w-3 h-3 text-trust-green" />
                      <span className="text-[11px] text-trust-green font-medium">
                        Dựa trên hồ sơ khách hàng tương tự
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead form */}
              <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      {...register("name")}
                      placeholder="Họ tên"
                      className="bg-[oklch(1_0_0/5%)] border-[oklch(1_0_0/10%)] text-text-primary placeholder:text-text-muted h-11"
                      id="lead-name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("phone")}
                      placeholder="Số điện thoại"
                      className="bg-[oklch(1_0_0/5%)] border-[oklch(1_0_0/10%)] text-text-primary placeholder:text-text-muted h-11"
                      id="lead-phone"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                    submitted
                      ? "bg-trust-green text-white"
                      : "bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-xl hover:shadow-generali-red/25 hover:-translate-y-0.5 pulse-cta"
                  } disabled:opacity-70`}
                  id="hero-cta"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Đã nhận thông tin. Tư vấn viên sẽ liên hệ ngay!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Xem phí phù hợp với bạn NGAY
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Micro-trust signals under CTA */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-trust-green" />
                    Bảo mật
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-generali-gold" />
                    Phản hồi 30s
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-generali-red-light" />
                    <a
                      href="tel:1900545453"
                      className="text-generali-red-light hover:underline font-medium"
                    >
                      1900 545 453
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
