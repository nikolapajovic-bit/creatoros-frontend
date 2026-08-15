export function resolveFileUrl(path?: string): string {
  if (!path) return "";
  // Cloudinary URL-ovi su već puni (https://res.cloudinary.com/...) — vraćamo direktno
  if (path.startsWith("http")) return path;

  // Fallback za stare, lokalne relativne putanje (ako neki stari zapisi ostanu u bazi)
  const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:${port}${path}`;
  }
  return `http://localhost:${port}${path}`;
}
