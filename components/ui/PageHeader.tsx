import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Standard editorial header for interior pages:
 * small eyebrow, large multi-line display title, quiet lead.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  index
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  index?: string;
}) {
  const lines = title.split("\n");
  return (
    <Container as="header" className="pb-12 pt-16 md:pt-24">
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-6 text-display-md font-semibold text-balance">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-ink-muted">
            {lead}
          </p>
        </Reveal>
      )}
    </Container>
  );
}
