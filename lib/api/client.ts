function resolveApiUrl(): string {
  // Produkcija: potpun URL backend-a se prosleđuje preko env varijable
  // (npr. https://creatoros-backend.onrender.com/api)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";

  if (typeof window !== "undefined") {
    // U browseru - koristi isti hostname sa kojeg je frontend otvoren
    // (localhost -> localhost, 192.168.x.x -> ista IP adresa)
    return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
  }

  // Server-side (SSR) fallback - retko se koristi jer je apiFetch client-side, ali za svaki slucaj
  return `http://localhost:${port}/api`;
}

const API_URL = resolveApiUrl();

// Access token se drži samo u memoriji (ne localStorage/cookie) — modul-level varijabla,
// nestaje na refresh stranice po dizajnu (auth store će ga obnoviti preko /auth/refresh)
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

interface ApiErrorBody {
  status: string;
  message: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { skipAuth, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include", // šalje httpOnly refresh cookie na svaki zahtev
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && !skipAuth
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null;
    throw new ApiError(body?.message ?? "Something went wrong", res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
