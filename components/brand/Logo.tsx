import { CatMark } from "./CatMark";

export function Logo({
  sub = true,
  className = ""
}: {
  sub?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <CatMark className="h-8 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.14em]">CAFE CHIRO</span>
        {sub && (
          <span className="mt-[3px] font-jp text-[10px] tracking-[0.16em] text-ink-muted">
            カフェ チロ
          </span>
        )}
      </span>
    </span>
  );
}
