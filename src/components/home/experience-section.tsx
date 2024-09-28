"use client";

import { sectionWrapper, subtitle, title } from "@/components";
import { MdCheck, MdWorkHistory } from "react-icons/md";

export const ExperienceSection = () => {
  return (
    <>
      <section
        className={sectionWrapper({
          class: "z-20 mt-16 lg:mt-44 max-w-4xl",
        })}
      >
        <div className="text-center md:text-start">
          <h1 className={title({ size: "lg" })}>Mi &nbsp;</h1>
          <h1 className={title({ color: "pink", size: "lg" })}>Experiencia</h1>
          <div className="flex flex-col md:flex-row items-center">
            <h1 className={title({ size: "lg" })}>profesional&nbsp;</h1>
            <MdWorkHistory
              className="text-pink-500 animate-heartbeat"
              size={50}
              style={{
                animationDuration: "2.5s",
              }}
            />
          </div>
        </div>
        <p className={subtitle()}>
          Mi experiencia profesional en el desarrollo de software
          <span className="text-pink-500"> Full-Stack.</span>
        </p>

        <br />
        <br />

        <div className="flex flex-col items-center">
          <ol className="relative border-s border-gray-200 dark:border-gray-700 max-w-md">
            <li className=" ms-8">
              <span className="absolute flex items-center justify-center  rounded-full -start-5 ring-8  ring-pink-200 dark:ring-pink-950 bg-pink-500 p-2">
                <MdCheck className="text-background" size={20} />
              </span>

              <h3 className={title({ size: "xs" })}>
                <span className="text-pink-500">Desarrollador Backend </span>{" "}
                enNetdreams
              </h3>

              <time className="block mb-2 text-base font-normal leading-none opacity-80">
                Enero 2021 - Actualidad
              </time>
              <p className={subtitle({ fullWidth: true })}>
                Implementé y mantuve los microservicios de la billetera digital{" "}
                <span className="text-pink-500">BIM</span> usando tecnologías
                como:
              </p>

              <ul className="list-disc list-inside marker:text-pink-500 pl-4  ">
                <li>Python - FastAPI</li>
                <li>AWS - Lambda, S3, SQS, SNS, RDS, DynamoDB</li>
                <li>Docker - Docker Compose - Kubernetes</li>
                <li> PostgreSQL - MySQL</li>
                <li>Git - CodeCommit</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
};
