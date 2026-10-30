import { HomeHeading } from "@/components/sections/home/HomeHeading";

type ToolsContent = {
  title: string;
  body: string;
  chips: string[];
  credential: string;
  recommendation: { quote: string; author: string; role: string; company: string; relationship: string };
};

/** Tools named in plain text (no logos), the founder credential, and a relevant client quote. */
export function ToolsAndProof({ content }: { content: ToolsContent }) {
  const { title, body, chips, credential, recommendation } = content;

  return (
    <section aria-labelledby="tools-title" className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-12 px-6 py-18 md:px-8 md:py-24 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] *:min-w-0">
        <div>
          <HomeHeading id="tools-title">{title}</HomeHeading>
          <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{body}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tools and technologies">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[#e6dcbc] bg-paper px-3.5 py-1.5 font-mono text-[0.8125rem] text-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-7 font-medium">{credential}</p>
        </div>

        <figure className="m-0 border-rule lg:border-l lg:pl-12">
          <blockquote className="font-display text-[clamp(1.45rem,1.1rem+1vw,1.95rem)] font-semibold leading-snug tracking-[-0.01em]">
            <p>&ldquo;{recommendation.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-5">
            <p className="font-semibold">{recommendation.author}</p>
            <p className="text-sm text-ink-soft">
              {recommendation.role}, {recommendation.company}
            </p>
            <p className="mt-1 text-sm font-medium text-brand-magenta">{recommendation.relationship}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
