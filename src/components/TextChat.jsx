import React from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import { AnimatedList } from "@/components/magicui/animated-list";
import { IconCloudDemo } from "./CloudIcon";

export const TextChats = () => {
  return (
    <section className="flex h-screen w-[80vw] mx-auto justify-center ">
      <div className="flex-1/2">
        <TextReveal>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error officiis quod soluta sed libero corporis necessitatibus molestiae voluptatum debitis quis itaque, ipsa iure, dolorem deserunt.</TextReveal>
      </div>
      <div className="flex-1/2 scale-150">
        <IconCloudDemo />
      </div>
    </section>
  );
};
