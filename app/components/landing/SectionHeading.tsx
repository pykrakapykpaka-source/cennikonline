import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-zinc-600">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-lg leading-8 text-zinc-600">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

