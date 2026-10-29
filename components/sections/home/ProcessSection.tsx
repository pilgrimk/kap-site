import { FileCheck, Map, MessageCircle, Wrench } from "lucide-react";
import { HOME_PROCESS } from "@/lib/content";
import { HomeHeading } from "./HomeHeading";

const icons = [MessageCircle, Map, Wrench, FileCheck];

export function ProcessSection() {
  const { title, steps } = HOME_PROCESS;

  return (
    <section id="how" aria-labelledby="process-title" className="scroll-mt-24 bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="process-title">{title}</HomeHeading>
        <ol className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className="relative">
                {/* On desktop the steps are joined by a line, like the workflow above */}
                {i < steps.length - 1 ? (
                  <span aria-hidden className="absolute top-6 left-[3.5rem] -right-6 hidden h-0.5 bg-coral-ink/60 lg:block" />
                ) : null}
                <div className="relative flex size-12 items-center justify-center rounded-[14px] border border-[#e6dcbc] bg-paper text-coral-ink">
                  <Icon aria-hidden className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-[1.3rem] font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
