import { cn } from "@/lib/utils";

export function HomeHeading({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-[clamp(2rem,1.2rem+2vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-balance",
        className,
      )}
    >
      {children}
    </h2>
  );
}
