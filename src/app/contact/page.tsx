import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ContactHero } from "@/components/ContactHero";
import { ContactSection } from "@/components/ContactSection";
import { ContactMap } from "@/components/ContactMap";
import { WaveDivider } from "@/components/WaveDivider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us — Aura Water",
  description:
    "Get in touch with Aura Water. Questions about our water, custom AURA X bottling, or bulk orders? Find our contact details, drop us a message, or visit us on the map.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full">
      <Navbar />
      <ContactHero />
      <ContactSection />
      <WaveDivider />
      <ContactMap />
      <Footer />
    </main>
  );
}
