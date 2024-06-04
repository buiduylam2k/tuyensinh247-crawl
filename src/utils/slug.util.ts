import slugify from "slugify";

export function generateUniqueSlug(title: string): string {
  const baseSlug = slugify(title.toLowerCase(), {
    replacement: "-",
    remove: undefined,
    lower: true,
  });

  return `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`.slice(
    0,
    50
  );
}
