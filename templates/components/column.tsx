import clsx from "clsx";
import React from "react";

export function Column({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(className, "w-full max-w-viewport flex-1")}>
      {children}
    </div>
  );
}

type PaddedProps = {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
};

export function Padded({ children, className, expanded }: PaddedProps) {
  return (
    <div
      className={clsx(className, "px-2 sm:px-6 2xl:px-0", {
        "2xl:relative 2xl:left-[-1rem] 2xl:px-4 2xl:w-[1232px]": expanded,
      })}
    >
      {children}
    </div>
  );
}
