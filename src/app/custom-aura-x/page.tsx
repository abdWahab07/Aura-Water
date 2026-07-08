import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ProductHero } from "@/components/ProductHero";
import { ProductSizesSection } from "@/components/ProductSizesSection";
import { NatureSection } from "@/components/NatureSection";
import { WaveDivider } from "@/components/WaveDivider";
import { Footer } from "@/components/Footer";
import { BRAND_BOTTLES } from "@/lib/productBottles";

export const metadata: Metadata = {
  title: "Custom AURA X — Sip. Refresh. Repeat.",
  description:
    "Custom AURA X bottled drinking water. Bring your brand to life with a bottle that is unmistakably yours.",
};

const FEATURED_BOTTLE = BRAND_BOTTLES[0];

export default function CustomAuraXPage() {
  return (
    <main className="relative w-full">
      <Navbar variant="white" />
      <ProductHero bottle={FEATURED_BOTTLE} />
      <ProductSizesSection
        title="Your Brand, Your Bottle"
        description="From events to retail, create a custom AURA X bottle that carries your identity wherever it goes."
        bottles={BRAND_BOTTLES}
      />
      <WaveDivider />
      <NatureSection
        bottle={FEATURED_BOTTLE}
        productName="Custom AURA X"
        tabUnderlineId="custom-nature-tab-underline"
      />
      <Footer />
    </main>
  );
}
