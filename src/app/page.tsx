import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ProofSection from "@/components/sections/ProofSection";
import ObjectionSection from "@/components/sections/ObjectionSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ActivityFeed from "@/components/floating/ActivityFeed";
import ZaloFloat from "@/components/floating/ZaloFloat";
import ExitPopup from "@/components/floating/ExitPopup";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <ProofSection />
        <ObjectionSection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />

      {/* Floating elements */}
      <ActivityFeed />
      <ZaloFloat />
      <ExitPopup />

      {/* GA4 Script placeholder */}
      {/* 
        Uncomment and replace G-XXXXXXXXXX with your GA4 measurement ID:
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      */}

      {/* FB Pixel placeholder */}
      {/*
        Uncomment and replace PIXEL_ID:
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      */}
    </>
  );
}
