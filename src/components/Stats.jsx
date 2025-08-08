import React, { useEffect, useState } from "react";
import NumberTicker from "@/components/magicui/NumberTicker";
import { apiRequest } from "@/lib/api";

export default function Stats() {
  const [stats, setStats] = useState({ projects: 0, votes: 0, learners: 0, satisfaction: 0 });

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await apiRequest("/stats", { method: "GET" });
        if (!ignore && res) {
          setStats({
            projects: Number(res.projects || 0),
            votes: Number(res.votes || 0),
            learners: Number(res.learners || 0),
            satisfaction: Number(res.satisfaction || 0),
          });
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="relative w-full py-16 border-y -mx-[max(0px,calc((100vw-100%)/2))]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
        <div>
          <div className="text-3xl font-extrabold sm:text-4xl">
            <NumberTicker value={stats.projects} suffix="+" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Projects Showcased</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold sm:text-4xl">
            <NumberTicker value={stats.votes} suffix="+" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Votes Cast</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold sm:text-4xl">
            <NumberTicker value={stats.learners} suffix="+" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Active Learners</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold sm:text-4xl">
            <NumberTicker value={stats.satisfaction} suffix="%" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Satisfaction Rate</div>
        </div>
      </div>
    </section>
  );
}
