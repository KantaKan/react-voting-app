import React from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import { AnimatedList } from "@/components/magicui/animated-list";
import { IconCloudDemo } from "./CloudIcon";

export const TextChats = () => {
  return (
    <section className="flex h-[100vh] w-[80vw] mx-auto justify-center  ">
      <div className="flex-2/3 ">
        <TextReveal>"Built with Effort. Designed with Passion. Learned with Purpose. Every project is a story of dedication and growth.."</TextReveal>
      </div>
      <div className="flex-1/3 scale-155">
        <IconCloudDemo />
      </div>
    </section>
  );
};
