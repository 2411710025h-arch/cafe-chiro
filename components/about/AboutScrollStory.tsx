"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import { Reveal } from "@/components/ui/Reveal";
import { cats } from "@/content/cats";

/**
 * ABOUT scroll story. A single sticky "stage" holds four full-bleed interior
 * photos; as the page scrolls through a tall wrapper, the scene (photo + short
 * copy) crossfades. Plain scroll — no snap, no hijack. Motion stays at the
 * "barely noticed" level and is disabled under prefers-reduced-motion.
 *
 * Scene photos live at /public/interior/about-0X-*.png (swap in the dedicated
 * ABOUT cuts there — same paths, no code change needed).
 */
const SCENES = [
  { img: "/interior/about-01-space.png", label: "SPACE", focus: "50% 45%" },
  { img: "/interior/about-02-cafe.png", label: "CAFE", focus: "35% 50%" },
  { img: "/interior/about-03-distance.png", label: "DISTANCE", focus: "50% 45%" },
  { img: "/interior/about-04-residents.png", label: "RESIDENTS", focus: "50% 55%" }
];

// Copy placement per scene — varies so it never looks like one template with
// the photo swapped. Mobile varies vertically; desktop also varies the side.
const PLACEMENT = [
  "items-end justify-start", // 01 bottom-left
  "items-center justify-start lg:justify-end", // 02 middle → right
  "items-start justify-start", // 03 top-left
  "items-end justify-start lg:justify-end" // 04 bottom → right
];

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
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const top = wrap.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const pos = progress * SCENES.length;
      const idx = Math.min(SCENES.length - 1, Math.max(0, Math.floor(pos)));
      const local = Math.min(1, Math.max(0, pos - idx));
      const reduce = mq.matches;

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === idx ? "1" : "0";
        el.style.transform =
          !reduce && i === idx ? `scale(${(1 + local * 0.025).toFixed(4)})` : "scale(1)";
      });

      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scene = t.scenes[active];

  return (
    <>
      {/* INTRO — plain scroll */}
      <section className="border-b border-line">
        <div className="container-edge py-20 md:py-28 lg:py-36">
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

      {/* SCROLL STORY */}
      <section
        ref={wrapRef}
        aria-label={dict.nav.about}
        className="relative h-[420vh] lg:h-[460vh]"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper-dim">
          {/* photo layers */}
          {SCENES.map((s, i) => (
            <div
              key={s.img}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
                willChange: "opacity, transform"
              }}
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
            </div>
          ))}

          {/* very light legibility scrim (keeps the photo's texture) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.30), rgba(255,255,255,0) 42%)"
            }}
          />

          {/* copy */}
          <div
            className={`container-edge relative z-10 flex h-full ${PLACEMENT[active]}`}
            style={{
              paddingTop: "calc(var(--header-h) + 1.5rem)",
              paddingBottom: "clamp(5rem, 10vh, 8rem)"
            }}
          >
            <div
              key={active}
              className="max-w-md animate-fade-up lg:max-w-xl"
              style={{ textShadow: "0 1px 26px rgba(255,255,255,0.7)" }}
            >
              <span className="label label-ink">
                0{active + 1} / {SCENES[active].label}
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
              {active === SCENES.length - 1 && (
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
          </div>

          {/* progress */}
          <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-12">
            {SCENES.map((s, i) => (
              <div key={s.label} className="flex items-center justify-end gap-3">
                <span
                  className={`text-[10px] tabular-nums transition-colors ${
                    i === active ? "text-ink" : "text-ink/40"
                  }`}
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
      </section>

      {/* ENDING — back to plain scroll */}
      <section className="border-t border-line bg-paper">
        <div className="container-edge py-24 md:py-36 lg:py-44">
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
    </>
  );
}
