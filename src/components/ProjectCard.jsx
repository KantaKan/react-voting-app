import { MinimalCard, MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from "@/components/ui/minimal-card";
import { RainbowButton } from "@/components/magicui/rainbow-button";

import { Heart, ArrowRight } from "lucide-react";
export function ProjectCard() {
  const cards = [
    {
      title: "Sick title",
      description: "How to design with gestures and motion that feel intuitive and natural.",
      src: "https://pbs.twimg.com/media/GgMiuRpa4AAoW2y?format=jpg&name=medium",
    },
    {
      title: "Sick title",
      description: "How to design with gestures and motion that feel intuitive and natural.",
      src: "https://pbs.twimg.com/media/GgHZJN0aoAA__92?format=jpg&name=medium",
    },
    {
      title: "Sick title",
      description: "How to design with gestures and motion that feel intuitive and natural.",
      src: "https://pbs.twimg.com/media/GgCPjsQacAAWvm3?format=jpg&name=medium",
    },
  ];
  return (
    <div className="w-full max-w-5xl ">
      <div className="flex flex-col justify-center rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-center ">
          {cards.map((card, index) => (
            <MinimalCard className="m-2 w-[460px] " key={index}>
              <MinimalCardImage className="h-[320px]" src={card.src} alt={card.title} />
              <MinimalCardTitle>{card.title}</MinimalCardTitle>
              <MinimalCardDescription>{card.description}</MinimalCardDescription>
              <div className="flex m-2 gap-2 items-center justify-between">
                <RainbowButton size="lg" variant="outline" className="flex-1 hover:scale-105 duration-100">
                  <Heart className=" fill-current text-red-500 hover:text-red-600" />
                  Like
                </RainbowButton>
                <RainbowButton size="lg" className="w-68 hover:scale-105 duration-100">
                  View this Project
                  <ArrowRight />
                </RainbowButton>
              </div>
            </MinimalCard>
          ))}
        </div>
      </div>
    </div>
  );
}
