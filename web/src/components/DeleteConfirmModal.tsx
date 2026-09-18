"use client";

import { WarningIcon } from "@/components/icons";
import { DangerButton, GrayButton } from "@/components/ui/PeachButton";

export function DeleteConfirmModal({
  open,
  kind,
  title,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  kind: string;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div onClick={onCancel} className="fixed inset-0 z-[55] flex items-center justify-center bg-[rgba(16,24,40,.5)] p-5">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[430px] overflow-hidden rounded-xl bg-white shadow-modal">
        <div className="p-[20px_22px]">
          <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-full bg-magenta-bg">
            <WarningIcon style={{ fontSize: 22, color: "var(--color-magenta-dark)" }} />
          </div>
          <div className="font-display mb-1.5 text-[17px] font-bold">Delete this {kind}?</div>
          <p className="mb-2 text-[13.5px] leading-[1.5] font-medium text-ink">&ldquo;{title}&rdquo;</p>
          <p className="m-0 text-[12.5px] leading-[1.5] text-muted-2">
            This permanently removes the content from the community. This action can&apos;t be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2.5 border-t border-border-3 bg-[#FAFBFC] p-[14px_22px]">
          <GrayButton onClick={onCancel}>Cancel</GrayButton>
          <DangerButton onClick={onConfirm} data-behavior="deletes content -> removes it">
            Delete permanently
          </DangerButton>
        </div>
      </div>
    </div>
  );
}
