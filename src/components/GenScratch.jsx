import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";

export function ScratchToRevealGen() {
  return (
    <ScratchToReveal width={1000} height={700} minScratchPercentage={40} className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100" gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}>
      <img src="/genstudent.webp" alt="" />
    </ScratchToReveal>
  );
}
