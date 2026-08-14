import { catCharge, extension, formatYen } from "@/content/menu";
import type { Dictionary } from "@/messages/ja";

/** Cat charge tiers — shared by the TOP price section and the Price page. */
export function ChargeTable({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
        {catCharge.map((plan) => (
          <div
            key={plan.minutes}
            className="flex flex-col gap-3 border-b border-line px-1 py-7 sm:border-r sm:px-6 sm:last:border-r-0"
          >
            <span className="label">
              {plan.minutes} <span className="tracking-normal">MIN</span>
            </span>
            <span className="text-display-sm font-semibold tabular-nums">
              {formatYen(plan.price)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between gap-4 py-5 text-sm">
        <span className="label">
          {dict.pricePage.extension} · {extension.minutes} MIN
        </span>
        <span className="tabular-nums text-ink-muted">
          + {formatYen(extension.price)}
          <span className="ml-1 text-xs">/ {dict.pricePage.extensionUnit}</span>
        </span>
      </div>
    </div>
  );
}
