export function ToggleSwitch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      data-behavior="toggles this email preference"
      className="relative h-[22px] w-[38px] flex-none cursor-pointer rounded-full transition-colors duration-150"
      style={{ background: on ? "var(--color-lilac)" : "#D1D5DB" }}
    >
      <span
        className="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(16,24,40,.2)] transition-[left] duration-150"
        style={{ left: on ? "18px" : "2px" }}
      />
    </div>
  );
}
