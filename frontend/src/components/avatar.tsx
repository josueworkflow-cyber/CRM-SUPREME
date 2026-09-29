type AvatarProps = {
  initials: string;
  tone?: number | string;
  className?: string;
  small?: boolean;
  label?: string;
};

export function Avatar({ initials, tone = 0, className = "", small = false, label }: AvatarProps) {
  const toneClass = typeof tone === "number" ? `tone-${((tone % 5) + 5) % 5}` : tone;
  const classNames = ["avatar", toneClass, small ? "avatar-small" : "", className].filter(Boolean).join(" ");
  return <span className={classNames} aria-label={label}>{initials}</span>;
}
