/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import { useUpdateEffect } from "@/hooks";
import { SearchResultItem } from "@/interfaces";
import { Button, ButtonProps } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Modal, ModalContent } from "@heroui/modal";
import { isAppleDevice, isWebKit } from "@react-aria/utils";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { clsx } from "clsx";
import { Command } from "cmdk";
import { intersectionBy, isEmpty } from "lodash";
import { matchSorter } from "match-sorter";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AiFillAlert,
  AiFillRightCircle,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsPostcardFill } from "react-icons/bs";
import MultiRef from "react-multi-ref";
import scrollIntoView from "scroll-into-view-if-needed";
import { tv } from "tailwind-variants";
import { create } from "zustand";
const hideOnPaths = ["examples"];

export interface CmdkStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCmdkStore = create<CmdkStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

const cmdk = tv({
  slots: {
    base: "max-h-full overflow-y-auto",
    header: [
      "flex",
      "items-center",
      "w-full",
      "px-4",
      "border-b",
      "border-default-400/50",
      "dark:border-default-100",
    ],
    searchIcon: "text-default-400 text-lg",
    input: [
      "w-full",
      "px-2",
      "h-14",
      "text-lg",
      "outline-none",
      "rounded-none",
      "bg-transparent",
      "text-default-700",
      "placeholder-default-500",
      "dark:text-default-500",
      "dark:placeholder:text-default-300",
    ],
    list: ["px-4", "mt-2", "pb-4", "overflow-y-auto", "max-h-[50vh]"],
    itemWrapper: [
      "px-4",
      "mt-2",
      "group",
      "flex",
      "h-16",
      "justify-between",
      "items-center",
      "rounded-lg",
      "shadow",
      "bg-content1/50",
      "active:opacity-70",
      "cursor-pointer",
      "transition-opacity",
      "data-[active=true]:bg-primary",
      "data-[active=true]:text-primary-foreground",
    ],
    leftWrapper: ["flex", "gap-3", "items-center", "w-full", "max-w-full"],
    leftIcon: [
      "text-default-500 dark:text-default-300",
      "group-data-[active=true]:text-primary-foreground",
    ],
    itemContent: ["flex", "flex-col", "gap-0", "justify-center", "max-w-[80%]"],
    itemParentTitle: [
      "text-default-400",
      "text-xs",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    itemTitle: [
      "truncate",
      "text-default-500",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    emptyWrapper: [
      "flex",
      "flex-col",
      "text-center",
      "items-center",
      "justify-center",
      "h-32",
    ],
  },
});

const MATCH_KEYS = [
  "hierarchy.lvl1",
  "hierarchy.lvl2",
  "hierarchy.lvl3",
  "content",
];
const RECENT_SEARCHES_KEY = "recent-searches";
const MAX_RECENT_SEARCHES = 10;
const MAX_RESULTS = 20;

export const Cmdk: FC<{}> = () => {
  const [searchData, setSearchData] = useState<SearchResultItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState(0);
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>());
  const slots = useMemo(() => cmdk({ class: "bg-success" }), []);

  const pathname = usePathname();

  const eventRef = useRef<"mouse" | "keyboard">("mouse");
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useCmdkStore();

  const [recentSearches] =
    useLocalStorage<SearchResultItem[]>(RECENT_SEARCHES_KEY);

  useEffect(() => {
    fetch("/search-meta.json")
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      })
      .catch(console.error);
  }, []);

  const addToRecentSearches = (item: SearchResultItem) => {
    let searches = recentSearches ?? [];

    // Avoid adding the same search again
    if (!searches.find((i) => i.objectID === item.objectID)) {
      writeStorage(
        RECENT_SEARCHES_KEY,
        [item, ...searches].slice(0, MAX_RECENT_SEARCHES)
      );
    } else {
      // Move the search to the top
      searches = searches.filter((i) => i.objectID !== item.objectID);
      writeStorage(
        RECENT_SEARCHES_KEY,
        [item, ...searches].slice(0, MAX_RECENT_SEARCHES)
      );
    }
  };

  const results = useMemo<SearchResultItem[]>(
    function getResults() {
      if (query.length < 2) return [];
      const words = query.split(" ");

      if (words.length === 1) {
        return matchSorter(searchData, query, {
          keys: MATCH_KEYS,
        }).slice(0, MAX_RESULTS);
      }

      const matchesForEachWord = words.map((word) =>
        matchSorter(searchData, word, {
          keys: MATCH_KEYS,
        })
      );

      const matches = intersectionBy(...matchesForEachWord, "objectID").slice(
        0,
        MAX_RESULTS
      );

      return matches;
    },
    [query, searchData]
  );

  const items = !isEmpty(results) ? results : recentSearches ?? [];

  // Toggle the menu when ⌘K / CTRL K is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const hotkey = isAppleDevice() ? "metaKey" : "ctrlKey";

      if (e?.key?.toLowerCase() === "k" && e[hotkey]) {
        e.preventDefault();
        isOpen ? onClose() : onOpen();
      }
    };

    document.addEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const onItemSelect = useCallback(
    (item: SearchResultItem) => {
      onClose();
      router.push(item.url);
      addToRecentSearches(item);
    },
    [router, recentSearches]
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = "keyboard";
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (activeItem + 1 < items.length) {
            setActiveItem(activeItem + 1);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (activeItem - 1 >= 0) {
            setActiveItem(activeItem - 1);
          }
          break;
        }
        case "Control":
        case "Alt":
        case "Shift": {
          e.preventDefault();
          break;
        }
        case "Enter": {
          if (items?.length <= 0) {
            break;
          }

          onItemSelect(items[activeItem]);

          break;
        }
      }
    },
    [activeItem, items, router]
  );

  useUpdateEffect(() => {
    setActiveItem(0);
  }, [query]);

  useUpdateEffect(() => {
    if (!listRef.current || eventRef.current === "mouse") return;
    const node = menuNodes.map.get(activeItem);

    if (!node) return;
    scrollIntoView(node, {
      scrollMode: "if-needed",
      behavior: "smooth",
      block: "end",
      inline: "end",
      boundary: listRef.current,
    });
  }, [activeItem]);

  const CloseButton = useCallback(
    ({
      onPress,
      className,
    }: {
      onPress?: ButtonProps["onPress"];
      className?: ButtonProps["className"];
    }) => {
      return (
        <Button
          isIconOnly
          className={clsx(
            "border data-[hover=true]:bg-content1 border-default-400 dark:border-default-100",
            className
          )}
          radius="full"
          size="sm"
          variant="bordered"
          onPress={onPress}
          aria-label="Cerrar búsqueda"
        >
          <AiOutlineClose />
        </Button>
      );
    },
    []
  );

  const renderItem = useCallback(
    (item: SearchResultItem, index: number, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";

      const mainIcon = isRecent ? (
        <AiOutlineSearch
          className={slots.leftIcon()}
          size={20}
          strokeWidth={2}
        />
      ) : isLvl1 ? (
        <BsPostcardFill className={slots.leftIcon()} />
      ) : (
        <AiFillAlert className={slots.leftIcon()} />
      );

      return (
        <Command.Item
          key={item.objectID}
          ref={menuNodes.ref(index)}
          className={slots.itemWrapper()}
          data-active={index === activeItem}
          value={item.content}
          onMouseEnter={() => {
            eventRef.current = "mouse";
            setActiveItem(index);
          }}
          onSelect={() => {
            if (eventRef.current === "keyboard") {
              return;
            }

            onItemSelect(item);
          }}
        >
          <div className={slots.leftWrapper()}>
            {mainIcon}
            <div className={slots.itemContent()}>
              {!isLvl1 && (
                <span className={slots.itemParentTitle()}>
                  {item.hierarchy.lvl1}
                </span>
              )}
              <p className={slots.itemTitle()}>{item.content}</p>
            </div>
          </div>

          <AiFillRightCircle size={14} />
        </Command.Item>
      );
    },
    [activeItem, onItemSelect, CloseButton, slots]
  );

  const shouldOpen = !hideOnPaths.some((path) => pathname.includes(path));

  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      classNames={{
        base: [
          "mt-[20vh]",
          "border-small",
          "dark:border-default-100",
          "supports-[backdrop-filter]:bg-background/80",
          "dark:supports-[backdrop-filter]:bg-background/30",
          "supports-[backdrop-filter]:backdrop-blur-md",
          "supports-[backdrop-filter]:backdrop-saturate-150",
        ],
        backdrop: ["bg-black/80"],
      }}
      isOpen={isOpen && shouldOpen}
      motionProps={{
        onAnimationComplete: () => {
          if (!isOpen) {
            setQuery("");
          }
        },
      }}
      placement="top-center"
      scrollBehavior="inside"
      size="xl"
      onClose={() => onClose()}
    >
      <ModalContent>
        <Command
          className={slots.base()}
          label="Comando de búsqueda rápida"
          shouldFilter={false}
        >
          <div className={slots.header()}>
            <AiOutlineSearch className={slots.searchIcon()} strokeWidth={2} />
            <Command.Input
              autoFocus={!isWebKit()}
              className={slots.input()}
              placeholder="Buscar contenido..."
              value={query}
              onKeyDown={onInputKeyDown}
              onValueChange={setQuery}
            />
            {query.length > 0 && <CloseButton onPress={() => setQuery("")} />}
            <Kbd className="hidden md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">
              ESC
            </Kbd>
          </div>
          <Command.List ref={listRef} className={slots.list()} role="listbox">
            {query.length > 0 && (
              <Command.Empty>
                <div className={slots.emptyWrapper()}>
                  <div>
                    <p>No se encontraron resultados para &quot;{query}&quot;</p>
                    {query.length === 1 ? (
                      <p className="">
                        Intente agregar más caracteres a su término de búsqueda.
                      </p>
                    ) : (
                      <p className="">Intenta buscar otra cosa.</p>
                    )}
                  </div>
                </div>
              </Command.Empty>
            )}

            {isEmpty(query) &&
              (isEmpty(recentSearches) ? (
                <div className={slots.emptyWrapper()}>
                  <p className="">No hay búsquedas recientes.</p>
                </div>
              ) : (
                recentSearches &&
                recentSearches.length > 0 && (
                  <Command.Group
                    heading={
                      <div className="flex items-center justify-between">
                        <p className="">Recent</p>
                      </div>
                    }
                  >
                    {recentSearches.map((item, index) =>
                      renderItem(item, index, true)
                    )}
                  </Command.Group>
                )
              ))}

            {results.map((item, index) => renderItem(item, index))}
          </Command.List>
        </Command>
      </ModalContent>
    </Modal>
  );
};
