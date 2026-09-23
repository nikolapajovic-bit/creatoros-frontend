function resolveApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";

  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
  }

  return `http://localhost:${port}/api`;
}

export const API_URL = resolveApiUrl();

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

// Sprečava da više istovremenih 401-ica pokrene više paralelnih refresh poziva —
// svi čekaju na ISTI Promise
let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessTokenInternal(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) return null;
        const data = (await res.json()) as { accessToken: string };
        accessToken = data.accessToken;
        return accessToken;
      } catch {
        return null;
      } finally {
        refreshInFlight = null;
      }
    })();
  }
  return refreshInFlight;
}

/**
 * Fetch sa automatskim Authorization header-om i tihim osvežavanjem tokena na 401.
 * Koristi ovo (umesto golog fetch()) svuda gde treba poseban fetch poziv van apiFetch-a
 * (npr. FormData upload) — garantuje isto ponašanje kao standardni JSON pozivi.
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && !isRetry) {
    const newToken = await refreshAccessTokenInternal();
    if (newToken) {
      return fetchWithAuth(url, options, true);
    }
  }

  return res;
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<T> {
  const { skipAuth, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && !skipAuth
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
      ...headers,
    },
  });

  if (res.status === 401 && !skipAuth && !isRetry && path !== "/auth/refresh") {
    const newToken = await refreshAccessTokenInternal();
    if (newToken) {
      return apiFetch<T>(path, options, true);
    }
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null;
    throw new ApiError(body?.message ?? "Something went wrong", res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
