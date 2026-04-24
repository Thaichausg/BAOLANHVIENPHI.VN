import { Shield, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[oklch(1_0_0/8%)] bg-[oklch(0.08_0.01_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-generali-red to-generali-red-light flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Bảo lãnh viện phí</p>
                <p className="text-[10px] text-text-muted">Generali Việt Nam</p>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-xs">
              Đại diện ủy quyền của Generali Việt Nam. 
              Thông tin trên trang mang tính tham khảo, quyền lợi chi tiết theo hợp đồng bảo hiểm.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Sản phẩm</h4>
            <ul className="space-y-2.5">
              {["Bảo lãnh viện phí", "Bảo hiểm sức khỏe", "Bảo hiểm nhân thọ", "Bảo hiểm gia đình"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Hỗ trợ</h4>
            <ul className="space-y-2.5">
              {[
                "Hướng dẫn claim",
                "Danh sách bệnh viện",
                "Câu hỏi thường gặp",
                "Điều khoản sử dụng",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-generali-red-light" />
                <a
                  href="tel:1900545453"
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  1900 545 453
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-generali-red-light" />
                <a
                  href="mailto:info@generali.vn"
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  info@generali.vn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-generali-red-light mt-0.5" />
                <span className="text-xs text-text-muted">
                  Tầng 5, Tòa nhà Etown Central,
                  <br />
                  11 Đoàn Văn Bơ, Quận 4, TP.HCM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mt-8 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2025 Bảo lãnh viện phí Generali. Trang thông tin sản phẩm.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Chính sách bảo mật
            </a>
            <span className="text-text-muted">•</span>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Điều khoản
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
