"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { sizes } from "@/assets";
import { sectionWrapper, subtitle, title } from "@/components";
import { IMG } from "@/components/common/IMG";
import { MDXContent } from "@/components/md/MDXContent";
import { useAuthor } from "@/hooks";
import { AiFillHeart } from "react-icons/ai";

export const AboutSection = () => {
  const { author } = useAuthor();
  const fullName = `${author.firstName} ${author.lastName}`;
  const photo = author.photos.at(-1)!;

  return (
    <section
      className={sectionWrapper({ class: "mt-24 lg:mt-56" })}
      id="home-about-me"
    >
      <div className="grid md:grid-cols-9 gap-8">
        <div className="md:col-span-4 min-h-[46rem]">
          <IMG
            src={photo.url}
            alt={author.firstName}
            sizes={sizes.sm}
            className="rounded-3xl shadow-xl"
          />
        </div>
        <div className="md:col-span-5 content-center row-start-1 md:row-start-auto">
          <div className="text-center md:text-start">
            <h1 className={title({ size: "lg" })}>Conoce &nbsp;</h1>
            <div className="flex flex-col items-center md:flex-row">
              <h1 className={title({ color: "blue", size: "lg" })}>
                más de mí&nbsp;
              </h1>
              <AiFillHeart
                className="text-primary animate-heartbeat"
                size={50}
                style={{
                  animationDuration: "2.5s",
                }}
              />
            </div>
          </div>
          <div className={subtitle({ fullWidth: true, class: "my-6" })}>
            <MDXContent>{author.bio?.toString()}</MDXContent>
          </div>
          <Table
            hideHeader
            removeWrapper
            isCompact
            aria-label="Tabla de información personal"
          >
            <TableHeader>
              <TableColumn> Key </TableColumn>
              <TableColumn> Value </TableColumn>
            </TableHeader>

            <TableBody>
              <TableRow key={1}>
                <TableCell>Nombre</TableCell>
                <TableCell>{fullName}</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell>Correo</TableCell>
                <TableCell>{author.email}</TableCell>
              </TableRow>
              <TableRow key={5}>
                <TableCell>Profesión</TableCell>
                <TableCell>{author.profession?.toString()}</TableCell>
              </TableRow>
              <TableRow key={6}>
                <TableCell>Universidad</TableCell>
                <TableCell>{author.university}</TableCell>
              </TableRow>
              <TableRow key={7}>
                <TableCell>Ciclo</TableCell>
                <TableCell>{author.cycle?.toString()}</TableCell>
              </TableRow>
              <TableRow key={8}>
                <TableCell>Dirección</TableCell>
                <TableCell>{author.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
