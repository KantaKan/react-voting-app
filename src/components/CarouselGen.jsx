import React from "react";
import { CardCarousel } from "@/components/ui/card-carousel";

export const CarouselGen = () => {
  const images = [
    { src: "/project/1.png", alt: "Image 1" },
    { src: "/project/2.png", alt: "Image 2" },
    { src: "/project/3.png", alt: "Image 3" },
    { src: "project/4.png", alt: "Image 4" },
    { src: "/project/5.png", alt: "Image 5" },
    { src: "/project/6.png", alt: "Image 6" },
    { src: "project/7.png", alt: "Image 7" },
  ];
  return (
    <div className="pt-40">
      <CardCarousel images={images} autoplayDelay={2000} showPagination={false} showNavigation={true} />
    </div>
  );
};
