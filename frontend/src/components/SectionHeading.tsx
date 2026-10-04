import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Heading className="text-4xl sm:text-5xl">{title}</Heading>
        {description && <p className="mt-4 text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
