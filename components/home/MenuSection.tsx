import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/media/Placeholder";
import { formatYen } from "@/content/menu";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

const highlights = [
  { name: "Café Latte", price: 650 },
  { name: "Matcha Latte", price: 680 },
  { name: "Basque Cheesecake", price: 720 },
  { name: "Croffle", price: 780 }
];

export function MenuSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const m = dict.menuSection;
  const lines = m.heading.split("\n");

  return (
    <section className="border-b border-line py-section" aria-labelledby="menu-heading">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal>
            <Placeholder
              variant="interior"
              tone="soft"
              className="aspect-[5/4] w-full"
              label="CAFÉ"
            />
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="04">{m.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="menu-heading" className="mt-6 text-display-sm font-semibold">
              {lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              {m.lead}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-8 flex flex-col">
              {highlights.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm tabular-nums text-ink-muted">
                    {formatYen(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <Link
              href={localePath(locale, "menu")}
              className="link-underline mt-8 inline-block text-sm font-medium"
            >
              {m.link} →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
