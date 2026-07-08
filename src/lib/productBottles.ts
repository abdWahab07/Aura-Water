export type ProductBottle = {
  src: string;
  alt: string;
  width: number;
  height: number;
  heightClass?: string;
};

export const AURA_X_BOTTLES = {
  small: {
    src: "/assets/smallWater.png",
    alt: "AURA X bottled drinking water — small",
    width: 407,
    height: 612,
    heightClass: "clamp(160px, 22vw, 280px)",
  },
  large: {
    src: "/assets/largeBottle.png",
    alt: "AURA X bottled drinking water — large",
    width: 433,
    height: 577,
    heightClass: "clamp(200px, 28vw, 360px)",
  },
} satisfies Record<string, ProductBottle>;

export const BRAND_BOTTLES: ProductBottle[] = [
  {
    src: "/assets/custom bottle/extraction.png",
    alt: "Custom AURA X — Extraction",
    width: 1024,
    height: 1536,
    heightClass: "clamp(200px, 28vw, 360px)",
  },
  {
    src: "/assets/custom bottle/pashtun.png",
    alt: "Custom AURA X — Pashtun",
    width: 1024,
    height: 1536,
    heightClass: "clamp(200px, 28vw, 360px)",
  },
  {
    src: "/assets/custom bottle/SM.png",
    alt: "Custom AURA X — SM",
    width: 1024,
    height: 1536,
    heightClass: "clamp(200px, 28vw, 360px)",
  },
];
