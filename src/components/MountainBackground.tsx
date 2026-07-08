import Image from "next/image";

/**
 * Scenic hero background. Uses the provided asset from /public.
 * Swap the `src` to change the photo without touching the layout.
 */
export function MountainBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <Image
        src="/assets/background.png"
        alt="Scenic mountain landscape at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
}
