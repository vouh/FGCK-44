import type { PropsWithChildren, ReactNode } from "react";
import { Container } from "./Container";
import ScrollFadeIn from "./ScrollFadeIn";

export function PageShell({ title, description, children }: PropsWithChildren<{ title: string; description?: ReactNode }>) {
  return (
    <div className="py-12">
      <Container>
        <ScrollFadeIn>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">{title}</h1>
            {description ? <div className="mt-3 text-sm leading-6 text-slate-600">{description}</div> : null}
          </div>
          <div className="mt-8">{children}</div>
        </ScrollFadeIn>
      </Container>
    </div>
  );
}
