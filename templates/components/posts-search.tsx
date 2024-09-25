import React from "react";
import { Input } from "../ui/input";
import Fuse from "fuse.js";
import clsx from "clsx";

type Results = {
  refIndex: number;
  score: number;
  item: { title: string; href: string; date: string };
}[];

export function PostsSearch() {
  const [isFocused, setIsFocused] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<Results>([]);
  const fuseRef = React.useRef(null);

  React.useEffect(() => {
    const postTitleElements = document.querySelectorAll(".post-title");
    const titles = Array.from(postTitleElements).map((el) => ({
      title: el.getAttribute("data-title"),
      href: el.getAttribute("data-href"),
      date: new Date(el.getAttribute("data-date")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    const fuse = new Fuse(titles, {
      keys: ["title", "date"],
      includeScore: true,
      threshold: 0.3,
    });

    fuseRef.current = fuse;
  }, []);

  React.useEffect(() => {
    if (!fuseRef.current) return;

    const results = fuseRef.current.search(search);
    setResults(results);
  }, [search]);

  React.useEffect(() => {
    const byYearEl = document.getElementById("by-year");

    if (isFocused) {
      byYearEl.classList.remove("hidden");
    } else {
      byYearEl.classList.add("hidden");
    }
  }, [isFocused]);

  return (
    <div className="relative">
      <div
        id="scrim"
        className={clsx("fixed inset-0 bg-slate-500/10", {
          hidden: !isFocused,
        })}
        onClick={() => {
          setIsFocused(false);
        }}
      />
      <Input
        autoFocus
        className="relative z-10"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (search.length) {
              setSearch("");
            } else {
              const input = e.target as HTMLInputElement;

              input.blur();
              setIsFocused(false);
            }
          }
        }}
        onFocus={() => {
          const byYearEl = document.getElementById("by-year");
          byYearEl.classList.remove("hidden");
          setIsFocused(true);
          const checkboxes = document.querySelectorAll(
            "input[type=checkbox]"
          ) as NodeListOf<HTMLInputElement>;

          checkboxes.forEach((checkbox) => (checkbox.checked = false));
        }}
      />
      <div
        className={clsx(
          "hidden-scroll absolute top-[3rem] z-10 flex flex-col gap-2 w-full h-[25rem] bg-white border rounded-md p-4",
          {
            hidden: !results.length,
          }
        )}
      >
        {results.map((r) => {
          const year = new Date(r.item.date).getFullYear();

          return (
            <a key={r.item.href} className="text-sm" href={r.item.href}>
              <span className="font-semibold">{year}</span>{" "}
              <span className="underline">{r.item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
