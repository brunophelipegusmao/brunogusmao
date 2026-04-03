import type { ReactNode } from "react";

import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-4 pb-32 sm:px-5 lg:px-8 lg:pb-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
