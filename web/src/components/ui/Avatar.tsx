import type { Author } from "@/lib/data-types";

const SIZE_PX: Record<"sm" | "md" | "lg" | "xl", number> = { sm: 28, md: 32, lg: 34, xl: 66 };
const FONT_PX: Record<"sm" | "md" | "lg" | "xl", number> = { sm: 11, md: 12, lg: 13, xl: 24 };

export function Avatar({
  author,
  size = "md",
  onClick,
  ring,
}: {
  author: Author;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  ring?: boolean;
}) {
  const px = SIZE_PX[size];
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      title={onClick ? author.name : undefined}
      className={`flex flex-none items-center justify-center overflow-hidden rounded-full font-semibold text-white ${onClick ? "cursor-pointer" : ""}`}
      style={{
        width: px,
        height: px,
        fontSize: FONT_PX[size],
        background: author.tone,
        border: ring ? "3px solid rgba(255,255,255,.5)" : undefined,
      }}
    >
      {author.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={author.avatarUrl} alt={author.name} className="h-full w-full object-cover" />
      ) : (
        author.initials
      )}
    </div>
  );
}
