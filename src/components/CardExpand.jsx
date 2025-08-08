"use client";

import React from "react";
import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import HoverExpand from "@/components/ui/hover-expand";

const images = ["/project/1.png", "/project/2.png", "/project/3.png", "project/4.png", "/project/5.png", "/project/6.png", "project/7.png"];

export function CardExpandGen() {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
      <div className="relative mx-auto flex w-full flex-col items-center justify-center  rounded-[24px] border border-black/5 bg-neutral-800/5  shadow-sm  md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] ">
        <article className="relative z-50 mt-20 flex flex-col  items-center justify-center ">
          <Badge variant="outline" className="mb-3 rounded-[14px] border border-black/10 bg-white text-base md:left-6">
            <SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" /> Checkout Some Project ⭐
          </Badge>
          <h1 className="max-w-2xl text-center text-5xl font-semibold tracking-tight ">Hover the Images to Expand</h1>
        </article>
        <HoverExpand images={images} initialSelectedIndex={0} thumbnailHeight={200} modalImageSize={400} maxThumbnails={11} />
      </div>
    </section>
  );
}
