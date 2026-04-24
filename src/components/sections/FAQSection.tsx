"use client";

import { useEffect, useRef } from "react";
import { faqData } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQSection() {
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
      id="faq"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.01_260)] to-background" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(1_0_0/5%)] text-text-secondary text-xs font-medium mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Câu hỏi thường gặp
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
            Giải đáp <span className="gradient-text">thắc mắc</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="reveal">
          <Accordion className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                className="glass-card rounded-xl border-none px-6 data-open:bg-[oklch(1_0_0/6%)]"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-text-primary hover:text-generali-gold hover:no-underline py-5 aria-expanded:text-generali-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* SEO structured data hint */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
