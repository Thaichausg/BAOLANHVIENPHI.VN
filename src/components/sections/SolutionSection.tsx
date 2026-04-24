"use client";

import { useEffect, useRef } from "react";
import {
  Hospital,
  CreditCard,
  Ban,
  Shield,
  Headphones,
  Smartphone,
  Settings,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Hospital,
    title: "Đến bệnh viện liên kết",
    desc: "Chọn 1 trong 400+ bệnh viện và phòng khám trong hệ thống Generali",
    color: "text-generali-gold",
    bg: "bg-generali-gold/10",
    border: "border-generali-gold/20",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Xuất thẻ bảo hiểm",
    desc: "Sử dụng thẻ vật lý hoặc thẻ điện tử trên app GenVita",
    color: "text-generali-red-light",
    bg: "bg-generali-red/10",
    border: "border-generali-red/20",
  },
  {
    number: "03",
    icon: Ban,
    title: "Không cần thanh toán trước",
    desc: "Generali thanh toán trực tiếp cho bệnh viện theo quyền lợi hợp đồng",
    color: "text-trust-green",
    bg: "bg-trust-green/10",
    border: "border-trust-green/20",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Bảo lãnh trực tiếp",
    desc: "Không cần tạm ứng tiền khi nhập viện tại bệnh viện liên kết",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    desc: "Đường dây nóng và tư vấn viên luôn sẵn sàng bất kỳ lúc nào",
  },
  {
    icon: Smartphone,
    title: "App quản lý GenVita",
    desc: "Tra cứu quyền lợi, claim online, thẻ điện tử ngay trên điện thoại",
  },
  {
    icon: Settings,
    title: "Quyền lợi linh hoạt",
    desc: "Nhiều gói bảo hiểm phù hợp từng nhu cầu và ngân sách",
  },
];

export default function SolutionSection() {
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
      id="solution"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[oklch(0.10_0.01_260)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_25/4%),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-trust-green/10 text-trust-green text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5" />
            Giải pháp đơn giản
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-4">
            Chỉ 3 bước – <span className="gradient-text">không lo viện phí</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Quy trình bảo lãnh viện phí được thiết kế đơn giản nhất có thể
          </p>
        </div>

        {/* Timeline steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="reveal relative"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className={`glass-card rounded-2xl p-6 lg:p-8 h-full border ${step.border}`}
                >
                  {/* Step number */}
                  <span
                    className={`text-5xl font-black opacity-10 absolute top-4 right-6 ${step.color}`}
                  >
                    {step.number}
                  </span>

                  <div
                    className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-7 h-7 ${step.color}`} />
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector (not on last item) */}
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-text-muted" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="reveal">
          <h3 className="text-xl font-bold text-text-primary text-center mb-8">
            Quyền lợi nổi bật
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 text-center group reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-generali-red/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-generali-red/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-generali-red-light" />
                  </div>
                  <h4 className="text-sm font-bold text-text-primary mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
