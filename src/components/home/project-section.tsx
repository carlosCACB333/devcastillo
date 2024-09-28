"use client";
import { Project } from "@/generated/graphql";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { FC } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { sectionWrapper, subtitle, title, titleWrapper } from "..";
import { Icon } from "../common/icon";
import { ProjectCard } from "../project/ProjectCard";

export interface Props {
  projects: Project[];
}

export const ProjectSection: FC<Props> = ({ projects }) => {
  return (
    <section
      className={sectionWrapper({
        class: "flex flex-col z-20 mt-16 lg:mt-44",
      })}
      id="home-projects"
    >
      <div className={titleWrapper({ class: "text-center items-center" })}>
        <div className="flex md:inline-flex flex-col md:flex-row items-center">
          <h1 className={title({ size: "lg" })}>Mis&nbsp;</h1>
          <h1 className={title({ size: "lg", color: "yellow" })}>
            proyectos&nbsp;
          </h1>
          <h1 className={title({ size: "lg" })}>personales&nbsp;</h1>
          <FaProjectDiagram
            className="text-warning animate-heartbeat"
            size={50}
            style={{
              animationDuration: "2.5s",
            }}
          />
        </div>
      </div>
      <p
        className={subtitle({
          class: "md:w-full flex justify-center items-center",
        })}
      >
        Aquí encontrarás los proyectos que he desarrollado y que he contribuido.
      </p>

      <br />
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((item) => (
          <div key={item.id}>
            <ProjectCard project={item} />
          </div>
        ))}
      </div>
      <div>
        <Button
          color="warning"
          href="/project"
          size="lg"
          endContent={<Icon name="right" />}
          aria-label="Ver más proyectos"
          as={NextLink}
        >
          Ver más
        </Button>
      </div>
    </section>
  );
};
