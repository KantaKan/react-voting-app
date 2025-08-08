import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Alice",
    username: "@alice",
    body: "Your dedication to perfecting the project was inspiring. Every detail showed real craftsmanship.",
    img: "/Bust/peep-1.png",
  },
  {
    name: "Brian",
    username: "@brian",
    body: "I’m impressed with how quickly you learned and applied new concepts. You really owned your code.",
    img: "/Bust/peep-2.png",
  },
  {
    name: "Chloe",
    username: "@chloe",
    body: "Your UI design was clean, thoughtful, and user-friendly. Amazing eye for detail!",
    img: "/Bust/peep-3.png",
  },
  {
    name: "David",
    username: "@david",
    body: "You went above and beyond — not just building a project, but understanding the 'why' behind it.",
    img: "/Bust/peep-4.png",
  },
  {
    name: "Ella",
    username: "@ella",
    body: "You turned challenges into learning opportunities. That persistence really paid off.",
    img: "/Bust/peep-5.png",
  },
  {
    name: "Felix",
    username: "@felix",
    body: "The way you collaborated with your team was top-notch. True team player energy.",
    img: "/Bust/peep-6.png",
  },
  {
    name: "Grace",
    username: "@grace",
    body: "From zero to a complete app in weeks — that’s some serious commitment and skill.",
    img: "/Bust/peep-7.png",
  },
  {
    name: "Henry",
    username: "@henry",
    body: "Your problem-solving mindset was incredible. You didn’t just find answers — you understood them.",
    img: "/Bust/peep-8.png",
  },
  {
    name: "Isla",
    username: "@isla",
    body: "The creativity in your project stood out. You brought something fresh and exciting to the table.",
    img: "/Bust/peep-9.png",
  },
  {
    name: "Jack",
    username: "@jack",
    body: "You weren’t afraid to push boundaries and try new tools. That’s how great developers grow.",
    img: "/Bust/peep-10.png",
  },
  {
    name: "Katie",
    username: "@katie",
    body: "Loved how you balanced design and functionality. A truly well-rounded project.",
    img: "/Bust/peep-11.png",
  },
  {
    name: "Leo",
    username: "@leo",
    body: "Your clean and maintainable code made the whole team’s life easier. Great discipline.",
    img: "/Bust/peep-12.png",
  },
  {
    name: "Mia",
    username: "@mia",
    body: "You learned so fast it was like watching a time-lapse of skill growth.",
    img: "/Bust/peep-13.png",
  },
  {
    name: "Noah",
    username: "@noah",
    body: "Your project demo had everyone’s attention — clear, confident, and engaging.",
    img: "/Bust/peep-14.png",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "You made complex features look simple for the user. That’s great UX thinking.",
    img: "/Bust/peep-15.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeGen() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
