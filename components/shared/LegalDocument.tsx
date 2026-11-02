import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, MAILING_ADDRESS, SITE_NAME } from "@/lib/constants";
import { LEGAL_CONTENTS_LABEL, type LegalBlock, type LegalDocument as Doc } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";

const linkClasses =
  "rounded-sm font-semibold underline decoration-foreground/40 underline-offset-4 transition-colors duration-150 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      {/* Phones: one card per row, so nothing scrolls sideways */}
      <ul className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row[0]} className="rounded-[12px] border border-rule bg-paper p-4">
            <dl className="grid gap-2 text-[0.95rem]">
              {row.map((cell, i) => (
                <div key={head[i]}>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{head[i]}</dt>
                  <dd className={cn("mt-0.5 wrap-anywhere", i === 0 && "font-semibold")}>{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-[12px] border border-rule md:block">
        <table className="w-full border-collapse text-left text-[0.95rem]">
          <thead className="bg-deep-cream/70">
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-paper">
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-rule align-top">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-4 py-3 font-semibold">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-4 py-3 leading-relaxed text-ink-soft">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if ("p" in block) {
    return (
      <p>
        {block.lead ? <strong className="font-semibold text-foreground">{block.lead}. </strong> : null}
        {block.p}
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="grid list-disc gap-2 pl-5 marker:text-coral-ink">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if ("table" in block) return <Table {...block.table} />;
  if ("links" in block) {
    return (
      <ul className="grid gap-2.5">
        {block.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn(linkClasses, "inline-flex items-baseline gap-1 text-foreground")}>
              {link.label}
              <ArrowUpRight aria-hidden className="size-3.5 shrink-0 self-center text-coral-ink" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <address className="rounded-[12px] border border-rule bg-paper px-5 py-4 not-italic text-foreground">
      <span className="font-semibold">{SITE_NAME}, LLC</span>
      <br />
      <a href={`mailto:${CONTACT_EMAIL}`} className={cn(linkClasses, "wrap-anywhere")}>
        {CONTACT_EMAIL}
      </a>
      <br />
      {MAILING_ADDRESS}
    </address>
  );
}

/** A privacy policy or terms page: compact hero, contents, then one reading column. */
export function LegalDocument({ doc }: { doc: Doc }) {
  return (
    <>
      <section aria-labelledby="legal-title" className="relative overflow-hidden">
        <div aria-hidden className={cn(o.atmosphere, "mask-[linear-gradient(to_bottom,black_45%,transparent)]")} />
        <div className="relative mx-auto max-w-3xl px-6 pt-8 pb-10 md:px-8 md:pt-14 md:pb-12">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
            {doc.date}
          </p>
          <h1
            id="legal-title"
            className="mt-4 font-display text-[clamp(2.2rem,1.5rem+2.4vw,3.4rem)] font-bold leading-[1.06] tracking-tight"
          >
            {doc.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.125rem]">{doc.intro}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-3xl min-w-0 gap-10 px-6 pb-20 md:px-8 md:pb-28">
        <nav aria-labelledby="legal-contents" className="border-y border-rule py-6">
          <h2 id="legal-contents" className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
            {LEGAL_CONTENTS_LABEL}
          </h2>
          <ol className="mt-4 grid gap-x-8 gap-y-2 text-[0.95rem] sm:grid-cols-2">
            {doc.sections.map((section, i) => (
              <li key={section.id} className="flex gap-3">
                <span aria-hidden className="w-5 shrink-0 font-mono text-[0.8125rem] leading-6 text-coral-ink">
                  {i + 1}
                </span>
                <a href={`#${section.id}`} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="grid min-w-0 gap-12">
          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
              <h2
                id={`${section.id}-title`}
                className="flex items-baseline gap-3 font-display text-[1.45rem] font-bold leading-tight tracking-[-0.01em] md:text-[1.6rem]"
              >
                <span aria-hidden className="font-mono text-[0.9rem] font-bold text-coral-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="mt-5 grid gap-5 text-[1.0625rem] leading-[1.7] text-ink-soft">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
