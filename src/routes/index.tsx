import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import {
  About,
  Availability,
  Awards,
  Contact,
  Faq,
  Journey,
  Process,
  Services,
  Toolbox,
} from "@/components/site/Sections";
import { profile } from "@/lib/portfolio";

const title = "Muhammad Waris — Senior UI/UX & Product Designer";
const description =
  "Portfolio of Muhammad Waris, UI/UX and product designer in Karachi. Mobile apps, SaaS dashboards, e-commerce and design systems built in Figma.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Senior UI/UX Designer",
          email: profile.email,
          telephone: profile.phone,
          address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
          sameAs: [profile.behance, profile.linkedin, profile.upwork],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Image Section - Hero se pehle */}
        <div className="flex justify-center items-center py-8 bg-gradient-to-b from-background to-muted/20">
          <img 
            src="/1000033091.webp" 
            alt="Muhammad Waris - UI/UX Designer" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-primary/20 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Hero />
        <About />
        <Toolbox />
        <Work />
        <Services />
        <Process />
        <Awards />
        <Journey />
        <Availability />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
