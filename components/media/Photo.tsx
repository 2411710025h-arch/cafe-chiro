"use client";

import Image from "next/image";
import { useState } from "react";
import { Placeholder } from "./Placeholder";

/**
 * Real interior photo (served via next/image so Vercel optimises the large
 * source PNGs). If the file is missing / fails to load, it falls back to the
 * designed placeholder so the layout never breaks.
 */
export function Photo({
  src,
  alt,
  focus = "50% 50%",
  label,
  variant = "interior",
  tone = "dim",
  className = ""
}: {
  src: string;
  alt: string;
  focus?: string;
  label?: string;
  variant?: "interior" | "news" | "plain";
  tone?: "soft" | "dim";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Placeholder variant={variant} tone={tone} label={label} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden rounded-img bg-paper-dim ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        onError={() => setFailed(true)}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
      {label && <span className="absolute left-4 top-4 z-10 label label-ink">{label}</span>}
    </div>
  );
}
