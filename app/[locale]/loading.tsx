import { CatMark } from "@/components/brand/CatMark";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <CatMark className="h-12 w-auto animate-fade-in text-mist-strong motion-safe:animate-pulse" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
