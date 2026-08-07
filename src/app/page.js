import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import TrustBar from "@/components/TrustBar";
import LifestyleSection from "@/components/LifestyleSection";
import Features from "@/components/Features";
import AdminSection from "@/components/AdminSection";
import UseCases from "@/components/UseCases";
// import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Queue Eliminator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free digital queuing system for businesses and customers"
  },
  description: "Eliminate long waiting lines at banks, hospitals, and government offices. Scan a QR code to join queues digitally, get real-time updates, and reclaim your time.",
  featureList: [
    "Real-Time Dashboard & Analytics",
    "Add Coordinators",
    "Custom Form Builder",
    "Flexible Scheduling Controls",
    "Live Queue Management",
    "Personal Dashboard",
    "Real-Time Queue Position",
    "Estimated Waiting Time",
    "Emergency Notifications",
    "Custom Reminders",
    "Spot Exchange",
    "Easy Cancellation"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "12000",
    bestRating: "5",
    worstRating: "1"
  },
  author: {
    "@type": "Organization",
    name: "Queue Eliminator",
    url: "https://queueeliminator.com"
  }
};

export default function Landing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div
        data-testid="landing-page"
        className="relative min-h-screen bg-[var(--bg-0)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden"
      >
        {/* Soft color blobs for vibrant GenZ aesthetic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top-left blue/purple blob */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-[120px] opacity-40 animate-pulse-slow" />
          {/* Bottom-right cyan/purple blob */}
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-cyan-400/25 blur-[140px] opacity-40 animate-pulse-slow-delay" />
          {/* Center purple accent blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px] opacity-30" />
        </div>

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <Navbar />
        <main>
          <Hero />
          {/* <TrustBar /> */}
          <LifestyleSection />
          <Features />
          <AdminSection />
          <UseCases />
          {/* <Testimonials /> */}
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
