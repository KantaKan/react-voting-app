import React from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import { AnimatedList } from "@/components/magicui/animated-list";
import { IconCloudDemo } from "./CloudIcon";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

export const TextChats = () => {
  return (
    <section className="flex h-[70vh] w-full max-w-7xl mx-auto items-center justify-center gap-8 p-8 ">
      {/* Terminal Section */}
      <div className="flex-1 max-w-md">
        <Terminal className="h-full">
          <TypingAnimation>&gt; pnpm dlx generation@bootcamp init</TypingAnimation>

          <AnimatedSpan className="text-green-500">✔ Full-Stack Development Mastery.</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Problem-Solving & Real-World Projects.</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Career-Ready Portfolio.</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Lifelong Tech Community.</AnimatedSpan>

          <TypingAnimation className="text-muted-foreground">Success! Project initialization completed.</TypingAnimation>
        </Terminal>

        {/* <TextReveal>"Built with Effort. Designed with Passion. Learned with Purpose. Every project is a story of dedication and growth.."</TextReveal> */}
      </div>

      {/* Icon Cloud Section */}
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="w-full h-full max-w-lg scale-150">
          <IconCloudDemo />
        </div>
      </div>
    </section>
  );
};
