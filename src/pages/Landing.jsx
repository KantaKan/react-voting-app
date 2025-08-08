import { Marquee } from "@/components/magicui/Marquee";
import { RetroGrid } from "@/components/magicui/RetroGrid";

import { InteractiveHoverButton } from "@/components/magicui/InteractiveHoverButton";
import { Link } from "react-router-dom";
import { AuroraText } from "@/components/magicui/aurora-text";
import TestimonialCard from "@/components/TestimonialCard";
import Stats from "@/components/Stats";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/magicui/TextReveal";
import AnimatedList from "@/components/magicui/AnimatedList";

const logos = [
  { name: "Generation Thailand", img: "/gen.png" },
  { name: "Vercel", img: "/vite.svg" },
  { name: "Generation KX", img: "/genkx.png" },
];
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity";
import { TextChats } from "../components/TextChat";
import { ScratchToRevealGen } from "../components/GenScratch";
import { CardExpandGen } from "../components/CardExpand";
import { MarqueeGen } from "../components/magicui/GenReview";

export default function Landing() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <RetroGrid opacity={0.2} />

      {/* Hero (full screen) */}
      <section id="hero" className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
          Generation Thailand
          <br />
          <AuroraText className="text-5xl sm:text-7xl">Learner Projects Voting System</AuroraText>
        </h1>
        <p className="mt-4 text-muted-foreground">Every line of code is a step toward mastery</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/login">
            <InteractiveHoverButton>Login</InteractiveHoverButton>
          </Link>
          <a href="#testimonials" className="border rounded-full px-5 py-2">
            Learners Projects
          </a>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">Powering the next generation of digital products</div>
        <div className="relative mt-4">
          <Marquee className="[--gap:3rem]">
            {logos.map((l, i) => (
              <div key={i} className="opacity-70">
                <img src={l.img} alt={l.name} className="h-8 w-auto" />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>

        {/* Text scroll banner */}
      </section>

      {/* Stats */}
      <Reveal>
        <section id="stats" className="relative z-10">
          <Stats />
        </section>
      </Reveal>

      {/* 50/50 Full-screen section: left TextReveal, right AnimatedList */}

      <TextChats />
      {/* Testimonials Marquee (moved below stats, full-width) */}
      {/* <Reveal>
        <section id="testimonials" className="relative z-10 mt-10 -mx-[max(0px,calc((100vw-100%)/2))]">
          <div className="relative overflow-hidden">
            <Marquee className="[--gap:2rem] [--duration:38s] px-4" pauseOnHover>
              {[
                { name: "John", handle: "@john", text: "Learner projects from this bootcamp are so good — can’t believe it’s just 4 months!" },
                { name: "Jack", handle: "@jack", text: "Incredible work. High quality, thoughtful UX, and great code." },
                { name: "Jane", handle: "@jane", text: "They ship fast and iterate even faster. Super impressed." },
                { name: "Jenny", handle: "@jenny", text: "Polished, practical, and production-ready. Wow." },
                { name: "Alex", handle: "@alex", text: "This is the kind of work teams love to adopt immediately." },
                { name: "Kim", handle: "@kim", text: "Creative solutions with clean implementation. Love it." },
              ].map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background" />
          </div>
        </section>
      </Reveal> */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            <AuroraText colors={["#42B7ED", "#f799c1"]}>Student Projects • Built in 73 Days • FullStack-Application • Bootcamp Showcase</AuroraText>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1}>
            <AuroraText>You Could Build This • In Just 73 Days • Join the Next Bootcamp</AuroraText>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      {/* <section className="flex items-center justify-center w-full min-h-screen">
        <ScratchToRevealGen />
      </section> */}
      <section className="my-25 w-full">
        <CardExpandGen />
      </section>
      <MarqueeGen />
    </div>
  );
}
