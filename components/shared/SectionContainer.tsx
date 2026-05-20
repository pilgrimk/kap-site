import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  innerClassName?: string;
};

export function SectionContainer({
  as: Tag = "section",
  className,
  innerClassName,
  children,
  ...rest
}: Props) {
  return (
    <Tag className={cn("relative py-24 md:py-32", className)} {...rest}>
      <div className={cn("mx-auto max-w-6xl px-6 md:px-8", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
