"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import { Reveal } from "@/components/ui/Reveal";
import { cats } from "@/content/cats";

/**
 * ABOUT scroll story — full-screen scene panels with native CSS scroll-snap:
 * one scroll gesture settles on the next scene. No wheel hijacking; keyboard
 * and normal scrolling still work, and snapping is turned off for
 * prefers-reduced-motion users. Copy position varies per scene so it never
 * reads as one template with the photo swapped.
 *
 * Scene photos live at /public/interior/about-0X-*.png — swap the dedicated
 * ABOUT cuts in there (same paths, no code change).
 */
const SCENES = [
  { img: "/interior/about-01-space.png", label: "SPACE", focus: "50% 45%" },
  { img: "/interior/about-02-cafe.png", label: "CAFE", focus: "35% 50%" },
  { img: "/interior/about-03-distance.png", label: "DISTANCE", focus: "50% 45%" },
  { img: "/interior/about-04-residents.png", label: "RESIDENTS", focus: "50% 55%" }
];

// Copy placement per scene (mobile varies vertically; desktop also varies side).
const PLACEMENT = [
  "items-end justify-start",
  "items-center justify-start lg:justify-end",
  "items-start justify-start",
  "items-end justify-start lg:justify-end"
];

const COPY_SHADOW = "0 1px 26px rgba(255,255,255,0.7)";

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

export function AboutScrollStory() {
  const { locale, dict } = useI18n();
  const t = dict.aboutStory;
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Enable page-level snap only while this page is mounted.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("snap-page");
    return () => html.classList.remove("snap-page");
  }, []);

  // Track the visible scene for the progress indicator.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.scene);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    sceneRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div aria-label={dict.nav.about}>
      {/* INTRO */}
      <section className="flex min-h-[100svh] snap-start items-center border-b border-line">
        <div className="container-edge w-full py-24">
          <Reveal>
            <span className="label label-ink">01 / ABOUT</span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              className="mt-6 font-semibold text-balance"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.75rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              <Lines text={t.introHeading} />
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-prose text-pretty text-[15px] leading-relaxed text-ink-muted">
              {t.introBody}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <span className="mt-12 inline-flex items-center gap-2 label">
              SCROLL TO EXPLORE
              <span aria-hidden className="motion-safe:animate-pulse">
                ↓
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* SCENES */}
      {SCENES.map((s, i) => {
        const scene = t.scenes[i];
        const isLast = i === SCENES.length - 1;
        return (
          <section
            key={s.img}
            data-scene={i}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="relative h-[100svh] snap-start overflow-hidden bg-paper-dim"
          >
            <Image
              src={s.img}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.focus }}
            />
            {/* very light legibility scrim (keeps the photo's texture) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.30), rgba(255,255,255,0) 42%)"
              }}
            />

            <div
              className={`container-edge relative z-10 flex h-full ${PLACEMENT[i]}`}
              style={{
                paddingTop: "calc(var(--header-h) + 1.5rem)",
                paddingBottom: "clamp(5rem, 10vh, 8rem)"
              }}
            >
              <Reveal className="max-w-md lg:max-w-xl">
                <div style={{ textShadow: COPY_SHADOW }}>
                  <span className="label label-ink">
                    0{i + 1} / {s.label}
                  </span>
                  <h2
                    className="mt-4 font-semibold text-balance text-ink"
                    style={{ fontSize: "clamp(2.1rem, 4.5vw, 4.25rem)", lineHeight: 1.08, letterSpacing: "-0.015em" }}
                  >
                    <Lines text={scene.heading} />
                  </h2>
                  {scene.body && (
                    <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-ink-soft">
                      {scene.body}
                    </p>
                  )}
                  {isLast && (
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {cats.map((c) => (
                        <span
                          key={c.id}
                          className="text-sm font-medium tracking-[0.16em] text-ink"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ENDING */}
      <section className="flex min-h-[100svh] snap-start items-center border-t border-line bg-paper">
        <div className="container-edge w-full py-24">
          <Reveal>
            <span className="label">MEET OUR CATS</span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-6 font-semibold text-balance"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              <Lines text={t.endingHeading} />
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href={localePath(locale, "cats")} className="btn btn-primary">
                {dict.common.viewCats} →
              </Link>
              <Link href={localePath(locale, "reservation")} className="btn btn-outline">
                {dict.common.reserve}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* progress (desktop) */}
      <div className="pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-12">
        {SCENES.map((s, i) => (
          <div key={s.label} className="flex items-center justify-end gap-3">
            <span
              className={`text-[10px] tabular-nums transition-colors duration-300 ${
                i === active ? "text-ink" : "text-ink/40"
              }`}
              style={{ textShadow: COPY_SHADOW }}
            >
              0{i + 1}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                i === active ? "w-8 bg-ink" : "w-3 bg-ink/30"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
