import { io, type Socket } from "socket.io-client";
import { getAccessToken } from "@/lib/api/client";

let socket: Socket | null = null;

function resolveSocketUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    // Ukloni "/api" sufiks — Socket.io se kači na koren servera, ne na /api rutu
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
  }
  const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:${port}`;
  }
  return `http://localhost:${port}`;
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io(resolveSocketUrl(), {
      auth: { token: getAccessToken() },
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) {
    s.auth = { token: getAccessToken() }; // osveži token pre svakog connect-a
    s.connect();
  }
  return s;
}

export function disconnectSocket() {
  socket?.disconnect();
}
