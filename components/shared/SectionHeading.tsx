import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <div className="mb-5">{eyebrow}</div> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-balance text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
