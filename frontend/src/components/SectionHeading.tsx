import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  /** Use on dark backgrounds. */
  light?: boolean;
}

/** A short section title with an optional "View all" style link on the right. */
export default function SectionHeading({ eyebrow, title, description, action, align = "left", as: Heading = "h2", light = false }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-4 flex gap-4 md:mb-8 ${centered ? "flex-col items-center text-center" : "items-end justify-between"}`}>
      <div className={centered ? "max-w-2xl" : "min-w-0"}>
        {eyebrow && <p className={`eyebrow mb-2 ${light ? "text-white/70" : ""}`}>{eyebrow}</p>}
        <Heading className={`section-title ${light ? "text-white" : ""}`}>{title}</Heading>
        {description && <p className={`mt-2 ${light ? "text-white/75" : "text-muted"}`}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
