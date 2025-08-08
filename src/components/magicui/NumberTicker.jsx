import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

export default function NumberTicker({ value = 0, duration = 1.6, decimals = 0, prefix = "", suffix = "", className = "", startOnVisible = true }) {
  const [started, setStarted] = useState(!startOnVisible);
  const nodeRef = useRef(null);
  const motion = useMotionValue(0);
  const rounded = useTransform(motion, (latest) => latest.toFixed(decimals));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!startOnVisible) return;
    const el = nodeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(motion, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [started, value, duration, motion]);

  const content = useMemo(() => `${prefix}${Number(display).toLocaleString()}${suffix}`, [display, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className} aria-label={`${value}`}>
      {content}
    </span>
  );
}
