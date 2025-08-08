import React from "react";

export default function TestimonialCard({ name, handle, text, from = "#22d3ee", to = "#a78bfa" }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
          <span className="text-sm font-semibold">{(name?.[0] || "?").toUpperCase()}</span>
        </div>
        <div className="leading-tight">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{handle}</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground/90">{text}</p>
    </div>
  );
}
