"use client";

import { useSyncExternalStore } from "react";
import type { Reservation } from "@/lib/types";
import { generateReservationCode } from "@/lib/slots";

/**
 * Browser-side reservation store (localStorage) for the booking demo.
 * Replaced by Supabase `reservations` table in production.
 */

const KEY = "chiro:reservations:v1";
const EMPTY: Reservation[] = [];

let cache: Reservation[] | null = null;
const listeners = new Set<() => void>();

function read(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Reservation[]) : [];
  } catch {
    return [];
  }
}

function write(list: Reservation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

function ensure(): Reservation[] {
  if (cache) return cache;
  cache = read();
  return cache;
}

function commit(next: Reservation[]) {
  cache = next;
  write(next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export interface ReservationInput {
  date: string;
  startTime: string;
  duration: number;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  note?: string;
}

export const reservationStore = {
  subscribe,
  getSnapshot(): Reservation[] {
    return ensure();
  },
  getServerSnapshot(): Reservation[] {
    return EMPTY;
  },
  all(): Reservation[] {
    return ensure();
  },
  create(input: ReservationInput): Reservation {
    const list = ensure();
    const reservation: Reservation = {
      id: "res-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      code: generateReservationCode(input.date),
      date: input.date,
      startTime: input.startTime,
      duration: input.duration,
      partySize: input.partySize,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      note: input.note?.trim() || "",
      createdAt: new Date().toISOString()
    };
    commit([reservation, ...list]);
    return reservation;
  }
};

/** Hook: reservations newest first (admin). */
export function useReservations(): Reservation[] {
  const list = useSyncExternalStore(
    reservationStore.subscribe,
    reservationStore.getSnapshot,
    reservationStore.getServerSnapshot
  );
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
