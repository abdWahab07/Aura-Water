import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OccasionsSection } from "@/components/OccasionsSection";
import { StillSection } from "@/components/StillSection";
import { CustomersSection } from "@/components/CustomersSection";
import { StayConnectedSection } from "@/components/StayConnectedSection";
import { WaveDivider } from "@/components/WaveDivider";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Hero />
      <OccasionsSection />
      <WaveDivider />
      <CustomersSection />
      <WaveDivider />
      <StillSection />
      <WaveDivider />
      <StillSection
        heading="CUSTOM AURA"
        description="Bring your brand to life with a bottle that is unmistakably yours. Work with us to create a custom AURA design from label artwork and colour palettes to finishes and packaging tailored to your business, event, or product line. Whether you are launching a new brand, refreshing an existing one, or looking for a premium giveaway, we help you shape every detail so your water looks as distinctive as the story behind it."
        bottles={[
          {
            src: "/assets/custom bottle/extraction.png",
            alt: "Custom AURA X bottle — extraction",
            width: 1024,
            height: 1536,
            scale: 1.12,
          },
          {
            src: "/assets/custom bottle/pashtun.png",
            alt: "Custom AURA X bottle — Pashtun",
            width: 1024,
            height: 1536,
          },
          {
            src: "/assets/custom bottle/SM.png",
            alt: "Custom AURA X bottle — SM",
            width: 1024,
            height: 1536,
          },
        ]}
      />
      <WaveDivider />
      <StayConnectedSection />
      <Footer />
    </main>
  );
}
