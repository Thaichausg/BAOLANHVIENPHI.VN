"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X, Phone, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Quyền lợi", href: "#solution" },
  { label: "Bằng chứng", href: "#proof" },
  { label: "So sánh", href: "#comparison" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[oklch(0.12_0.01_260/90%)] backdrop-blur-xl shadow-lg shadow-black/10 border-b border-[oklch(1_0_0/5%)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-generali-red to-generali-red-light flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-text-primary leading-tight">
                Bảo lãnh viện phí
              </p>
              <p className="text-[10px] text-text-muted leading-tight">
                Generali Việt Nam
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-generali-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-generali-red/15 text-generali-red-light text-sm font-medium hover:bg-generali-red/25 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Tư vấn ngay
            </a>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-[oklch(1_0_0/5%)] flex items-center justify-center text-text-secondary hover:text-text-primary transition cursor-pointer"
              aria-label={isMobileOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[oklch(0.14_0.01_260/98%)] backdrop-blur-xl border-t border-[oklch(1_0_0/5%)]">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-[oklch(1_0_0/5%)] transition-colors"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-generali-red text-white text-sm font-bold mt-2"
            >
              <Phone className="w-4 h-4" />
              Tư vấn ngay
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
