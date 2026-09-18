import { UpvoteIcon } from "@/components/icons";

export function VoteButton({
  votes,
  active,
  onToggle,
  bordered = false,
}: {
  votes: number;
  active: boolean;
  onToggle: () => void;
  bordered?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      data-behavior="toggles your upvote (optimistic)"
      className={`inline-flex items-center gap-1.5 bg-transparent text-xs font-semibold cursor-pointer ${
        bordered ? "rounded-lg border border-border px-2.5 py-1.5" : "border-none p-0"
      }`}
      style={{ color: active ? "var(--color-lilac)" : "var(--color-muted)" }}
    >
      <UpvoteIcon style={{ fontSize: 14 }} />
      {votes}
    </button>
  );
}
