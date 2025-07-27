"use client";

import { useAuthor } from "@/hooks";
import { Route } from "@/interfaces";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { clsx } from "@heroui/shared-utils";
import { isAppleDevice } from "@react-aria/utils";
import { includes } from "lodash";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useCmdkStore } from "./cmdk";
import { Icon } from "./icon";
import { ThemeSwitch } from "./theme-switch";

export interface NavbarProps {
  routes: Route[];
  mobileRoutes: Route[];
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({
  children,
  routes,
  mobileRoutes = [],
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");
  const { author } = useAuthor();
  const pathname = usePathname();
  const cmdkStore = useCmdkStore();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const searchButton = (
    <Button
      aria-label="Buscar"
      className="text-sm font-normal"
      endContent={
        <Kbd className="py-0.5 px-2 bg-background" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <AiOutlineSearch
          className="text-base pointer-events-none shrink-0"
          size={18}
          strokeWidth={2}
        />
      }
      onPress={() => cmdkStore.onOpen()}
    >
      Buscar...
    </Button>
  );

  const navLinkClasses = clsx(
    "data-[active=true]:text-primary hover:opacity-80 transition-opacity"
  );

  return (
    <NextUINavbar
      className={clsx({
        "z-100001": isMenuOpen,
      })}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit ">
          <NextLink aria-label="Home" className="flex items-center" href="/">
            <Icon name="logo" className="fill-primary" height={40} width={40} />
            <span className="font-extrabold text-lg hidden sm:inline">
              devcastillo
            </span>
          </NextLink>
        </NavbarBrand>

        {routes.map((route) => (
          <NavbarItem key={route.key} className="hidden sm:inline">
            <NextLink
              className={navLinkClasses}
              color="foreground"
              data-active={includes(pathname, route.path)}
              href={route.path}
              aria-label={route.title}
            >
              {route.title}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="flex w-full gap-2" justify="end">
        {author.github && (
          <NavbarItem className="flex h-full items-center">
            <Link
              isExternal
              aria-label="Github"
              className="p-1"
              href={author.github}
            >
              <Icon name="git" className="text-foreground" />
            </Link>
          </NavbarItem>
        )}
        {author.linkedin && (
          <NavbarItem className="flex h-full items-center">
            <Link
              isExternal
              aria-label="Linkedin"
              className="p-1"
              href={author.linkedin}
            >
              <Icon name="linkedin" className="text-foreground" />
            </Link>
          </NavbarItem>
        )}
        <NavbarItem className="flex h-full items-center">
          <NextLink
            aria-label="Invítame un café"
            className="p-1"
            href="/donate"
          >
            <Icon name="coffe" className="text-foreground" />
          </NextLink>
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex h-full items-center sm:hidden">
          <Button
            size="sm"
            isIconOnly
            className="bg-transparent"
            aria-label="Buscar"
            onPress={() => cmdkStore.onOpen()}
          >
            <AiOutlineSearch className="mt-px text-foreground" size={20} />
          </Button>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">{searchButton}</NavbarItem>

        <NavbarItem className="w-10 h-full sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-full h-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {mobileRoutes.map((item) => (
            <NavbarMenuItem key={item.key}>
              <NextLink
                href={item.path}
                data-active={includes(pathname, item.path)}
                className={navLinkClasses}
                aria-label={item.title}
              >
                {item.title}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
        {children}
      </NavbarMenu>
    </NextUINavbar>
  );
};
