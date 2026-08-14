"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Real cat photo from /public, served through next/image so Vercel optimises
 * the large source PNGs into right-sized WebP/AVIF automatically. If the file
 * is missing / fails to load, it removes itself so the silhouette layer beneath
 * shows instead — the site never displays a broken image.
 */
export function CatPhoto({
  src,
  alt,
  focus = "50% 35%",
  className = ""
}: {
  src: string;
  alt: string;
  focus?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={{ objectPosition: focus }}
    />
  );
}
