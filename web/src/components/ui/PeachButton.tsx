import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean };

export function PeachButton({ fullWidth, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-md border border-peach-border bg-peach px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}

export function GrayButton({ fullWidth, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-md border border-border bg-gradient-to-b from-white to-[#f3f4f6] px-4 py-2.5 text-[13px] font-semibold text-[#323739] ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}

export function OutlineButton({ fullWidth, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-md border border-[#D8DCDE] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink hover:bg-[#F3F5F6] ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}

export function DangerButton({ fullWidth, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-md border border-magenta-dark bg-magenta-dark px-4.5 py-2 text-[13px] font-semibold text-white ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}

export function DangerOutlineButton({ fullWidth, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`cursor-pointer rounded-md border border-magenta-border bg-white px-3.5 py-2 text-[12.5px] font-semibold text-magenta-dark hover:bg-magenta-bg ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}
