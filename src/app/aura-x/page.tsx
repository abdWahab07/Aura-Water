import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ProductHero } from "@/components/ProductHero";
import { ProductSizesSection } from "@/components/ProductSizesSection";
import { NatureSection } from "@/components/NatureSection";
import { WaveDivider } from "@/components/WaveDivider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AURA X — Sip. Refresh. Repeat.",
  description:
    "AURA X bottled drinking water. Staying hydrated doesn't have to be complicated.",
};

export default function AuraXPage() {
  return (
    <main className="relative w-full">
      <Navbar variant="white" />
      <ProductHero />
      <ProductSizesSection />
      <WaveDivider />
      <NatureSection />
      <Footer />
    </main>
  );
}
