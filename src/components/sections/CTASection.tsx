"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormData } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  Shield,
} from "lucide-react";

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      wantClaimGuide: false,
    },
  });

  const wantClaimGuide = watch("wantClaimGuide");

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

  const onSubmit = async (data: LeadFormData) => {
    // Track GA4
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "final_cta",
        value: 1,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Final CTA lead:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.10_0.01_260)] to-[oklch(0.08_0.01_280)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_25/6%),transparent_60%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-generali-red to-generali-red-light flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-4">
            Bạn muốn biết phí{" "}
            <span className="gradient-text">phù hợp với mình?</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Để lại thông tin, tư vấn viên sẽ gọi lại trong vòng 30 giây với báo giá cá nhân hóa
          </p>
        </div>

        {/* Form card */}
        <div className="reveal glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input
                {...register("name")}
                placeholder="Họ tên của bạn"
                className="bg-[oklch(1_0_0/5%)] border-[oklch(1_0_0/10%)] text-text-primary placeholder:text-text-muted h-12 text-base"
                id="cta-name"
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1.5">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("phone")}
                placeholder="Số điện thoại"
                className="bg-[oklch(1_0_0/5%)] border-[oklch(1_0_0/10%)] text-text-primary placeholder:text-text-muted h-12 text-base"
                id="cta-phone"
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1.5">{errors.phone.message}</p>
              )}
            </div>

            {/* Claim guide checkbox */}
            <div className="flex items-center gap-3 py-2">
              <Checkbox
                id="claim-guide"
                checked={wantClaimGuide}
                onCheckedChange={(checked) =>
                  setValue("wantClaimGuide", checked === true)
                }
                className="border-[oklch(1_0_0/20%)] data-[state=checked]:bg-generali-red data-[state=checked]:border-generali-red"
              />
              <label
                htmlFor="claim-guide"
                className="text-sm text-text-secondary cursor-pointer select-none"
              >
                📄 Nhận file hướng dẫn claim bảo hiểm (miễn phí)
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                submitted
                  ? "bg-trust-green text-white"
                  : "bg-gradient-to-r from-generali-red to-generali-red-light text-white hover:shadow-xl hover:shadow-generali-red/25 hover:-translate-y-0.5 pulse-cta"
              } disabled:opacity-70`}
              id="final-cta"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Đã gửi thành công! Tư vấn viên sẽ liên hệ bạn
                </>
              ) : isSubmitting ? (
                "Đang gửi..."
              ) : (
                <>
                  Xem báo giá ngay
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-[oklch(1_0_0/8%)]">
            {[
              { icon: Shield, text: "Bảo mật thông tin" },
              { icon: Phone, text: "Phản hồi trong 30s" },
              { icon: CheckCircle2, text: "Tư vấn miễn phí" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-text-muted"
                >
                  <Icon className="w-3.5 h-3.5 text-trust-green" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
