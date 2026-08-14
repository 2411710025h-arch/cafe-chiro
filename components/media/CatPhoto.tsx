"use client";

import { useState } from "react";

/**
 * Renders a real cat photo from /public. If the file is missing (or fails to
 * load) it removes itself so the silhouette layer beneath shows instead — so
 * the site never displays a broken image before the photos are added.
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: focus }}
    />
  );
}
