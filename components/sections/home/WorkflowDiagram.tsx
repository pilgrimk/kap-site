import { BellRing, Contact, Inbox, Send, Sparkles } from "lucide-react";
import { HOME_WORKFLOW } from "@/lib/content";
import { cn } from "@/lib/utils";
import { WorkflowMotion } from "@/components/shared/WorkflowMotion";
import s from "./workflow.module.css";

const resultIcons = [Contact, Send, BellRing];
const resultStages = [s.o1, s.o2, s.o3];

export function WorkflowDiagram({ className }: { className?: string }) {
  const { label, trigger, start, ai, results, caption } = HOME_WORKFLOW;

  return (
    <WorkflowMotion className={cn(s.flow, className)} labelledBy="workflow-caption">
      <div className={s.head}>
        <span>{label}</span>
        <span>{trigger}</span>
      </div>

      <ol className={s.diagram}>
        <li className={cn(s.node, s.n1)}>
          <div className={cn(s.tile, s.trigger)}>
            <Inbox aria-hidden />
          </div>
          <p className={s.kind}>{start.kind}</p>
          <p className={s.title}>{start.title}</p>
          <p className={s.detail}>{start.detail}</p>
        </li>

        <li className={s.connH} aria-hidden>
          <svg className={s.wire} viewBox="0 0 40 100" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="40" y2="50" />
          </svg>
          <svg className={cn(s.wire, s.sig, s.sig1)} viewBox="0 0 40 100" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="40" y2="50" />
          </svg>
        </li>

        <li className={cn(s.node, s.n2)}>
          <div className={cn(s.tile, s.ai)}>
            <Sparkles aria-hidden />
          </div>
          <p className={s.kind}>{ai.kind}</p>
          <p className={s.title}>{ai.title}</p>
          <p className={s.detail}>{ai.detail}</p>
        </li>

        <li className={s.connB} aria-hidden>
          <svg className={s.wire} viewBox="0 0 48 300" preserveAspectRatio="none">
            <path d="M0 150 C 24 150, 24 50, 48 50" />
            <line x1="0" y1="150" x2="48" y2="150" />
            <path d="M0 150 C 24 150, 24 250, 48 250" />
          </svg>
          <svg className={cn(s.wire, s.sig, s.sig2)} viewBox="0 0 48 300" preserveAspectRatio="none">
            <path d="M0 150 C 24 150, 24 50, 48 50" />
            <line x1="0" y1="150" x2="48" y2="150" />
            <path d="M0 150 C 24 150, 24 250, 48 250" />
          </svg>
        </li>

        <li className={s.outWrap}>
          <span className={s.bus} aria-hidden />
          <ul className={s.outputs}>
            {results.map((result, i) => {
              const Icon = resultIcons[i];
              return (
                <li key={result.title}>
                  <span className={s.tick} aria-hidden />
                  <div className={cn(s.node, resultStages[i])}>
                    <div className={cn(s.tile, s.result)}>
                      <Icon aria-hidden />
                    </div>
                    <div>
                      <p className={s.title}>{result.title}</p>
                      <p className={s.detail}>{result.detail}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      </ol>

      <figcaption className={s.caption} id="workflow-caption">
        {caption}
      </figcaption>
    </WorkflowMotion>
  );
}
