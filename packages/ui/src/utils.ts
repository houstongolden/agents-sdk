export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function faviconUrl(domain?: string) {
  return domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
    : undefined;
}

export function initialsFor(value?: string) {
  const words = value?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (!words.length) return "A";
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}
