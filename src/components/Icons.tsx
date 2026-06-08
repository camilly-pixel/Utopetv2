export function LogoSvg() {
  return (
    <span className="u-mark">
      <svg viewBox="0 0 62 100" aria-hidden="true">
        <path d="M8 6 v44 a23 23 0 0 0 46 0 v-44" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
        <path d="M16 84 a18 14 0 0 1 30 0" fill="none" stroke="var(--lilas)" strokeWidth="11" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
