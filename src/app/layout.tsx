import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bảo Lãnh Viện Phí Generali 2025 – Đi Viện Không Cần Chuẩn Bị Tiền",
  description:
    "Bảo lãnh viện phí Generali tại 460+ bệnh viện. Không cần tạm ứng, hỗ trợ 24/7. Xem phí phù hợp với bạn ngay.",
  keywords: [
    "bảo lãnh viện phí",
    "generali",
    "bảo hiểm sức khỏe",
    "bảo hiểm viện phí",
    "generali vita",
    "bảo hiểm bệnh viện",
  ],
  openGraph: {
    title: "Bảo Lãnh Viện Phí Generali 2025",
    description:
      "Đi viện không cần chuẩn bị tiền mặt. Bảo lãnh trực tiếp tại 460+ bệnh viện.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
