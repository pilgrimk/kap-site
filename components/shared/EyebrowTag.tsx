import { cn } from "@/lib/utils";

export function EyebrowTag({
  children,
  className,
  tone = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "accent" | "muted";
}) {
  const dotClass =
    tone === "accent"
      ? "bg-accent"
      : tone === "muted"
        ? "bg-foreground/40"
        : "bg-primary";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70",
        className,
      )}
    >
      <span className={cn("inline-block size-1.5 rounded-full", dotClass)} />
      {children}
    </span>
  );
}
