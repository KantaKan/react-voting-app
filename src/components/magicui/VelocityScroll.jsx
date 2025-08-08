import React, { useRef } from "react";
import { motion as Motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

// Utility to wrap a value between [min, max)
function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function VelocityScroll({
  text = "Vote • Build • Ship • ",
  baseVelocity = 40, // percentage per second
  repeat = 6,
  className,
  textClassName,
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);
  const direction = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    const seconds = delta / 1000;
    // Flip direction based on scroll velocity sign
    const vf = velocityFactor.get();
    direction.current = vf < 0 ? -1 : vf > 0 ? 1 : direction.current;
    let moveBy = direction.current * baseVelocity * seconds;
    moveBy += direction.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("relative w-full overflow-hidden py-6", className)}>
      <Motion.div style={{ x }} className={cn("flex whitespace-nowrap font-semibold opacity-90", textClassName)}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-4">
            {text}
          </span>
        ))}
      </Motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background" />
    </div>
  );
}
