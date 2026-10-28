"use client";

import { useSyncExternalStore } from "react";
import {
  getAuthSnapshot,
  getServerAuthSnapshot,
  subscribeAuth,
} from "@/lib/supabase/auth-store";

export function useAuth() {
  return useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
}
