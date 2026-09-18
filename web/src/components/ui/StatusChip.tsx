import { CheckIcon } from "@/components/icons";
import type { StatusDef } from "@/lib/status";

export function StatusChip({ status, size = "md" }: { status: StatusDef; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-[3px] text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap ${pad}`}
      style={{ background: status.bg, color: status.fg }}
    >
      {status.check && <CheckIcon style={{ fontSize: size === "sm" ? 11 : 12 }} />}
      {status.label}
    </span>
  );
}
