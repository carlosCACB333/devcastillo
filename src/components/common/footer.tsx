"use client";
import { useAuthor } from "@/hooks";
import { Link } from "@heroui/link";
import NextLink from "next/link";

export const Footer = () => {
  const { author } = useAuthor();

  return (
    <footer className="container mx-auto max-w-7xl px-4 py-2 text-center">
      <p className="text-sm ">
        Creado con ❤️ por&nbsp;
        <Link className="text-primary" href="/" as={NextLink}>
          {author.firstName} {author.lastName}
        </Link>
      </p>
    </footer>
  );
};
