import React from "react";
import { ProjectCard } from "../components/ProjectCard";

export const ListPage = () => {
  return (
    <main className=" m-4 grid grid-cols-3 gap-4 ">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </main>
  );
};
