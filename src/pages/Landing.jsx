import { Marquee } from "@/components/magicui/Marquee";
import { RetroGrid } from "@/components/magicui/RetroGrid";
import { AnimatedGradientText } from "@/components/magicui/AnimatedGradientText";
import { InteractiveHoverButton } from "@/components/magicui/InteractiveHoverButton";
import { Link } from "react-router-dom";

const logos = [
  { name: "Generation Thailand", img: "/gen.png" },
  { name: "Vercel", img: "/vite.svg" },
  { name: "Generation KX", img: "/genkx.png" },
];

export default function Landing() {
  return (
    <div className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden">
      <RetroGrid opacity={0.2} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
          Generation Thailand
          <br />
          <AnimatedGradientText className="text-5xl sm:text-7xl">Learner Projects Voting System</AnimatedGradientText>
        </h1>
        <p className="mt-4 text-muted-foreground">hello world</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/login">
            <InteractiveHoverButton>Login</InteractiveHoverButton>
          </Link>
          <a href="#learn" className="border rounded-full px-5 py-2">
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
      </div>
    </div>
  );
}
