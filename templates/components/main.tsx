import React from "react";

type MainProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Main({ children, ...props }: MainProps) {
  return (
    <main
      className="flex flex-col gap-10 items-center max-w-viewport border-solid border-l-primary border-r-primary bg-primary flex-1"
      {...props}
    >
      {children}
    </main>
  );
}
