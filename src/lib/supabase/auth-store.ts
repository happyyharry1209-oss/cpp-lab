"use client";

import type { User } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "./client";

export interface AuthSnapshot {
  configured: boolean;
  loading: boolean;
  user: User | null;
}

const INITIAL_SNAPSHOT: AuthSnapshot = {
  configured: isSupabaseConfigured,
  loading: isSupabaseConfigured,
  user: null,
};

let snapshot = INITIAL_SNAPSHOT;
let initialized = false;
let unsubscribeAuth: (() => void) | undefined;
const listeners = new Set<() => void>();

function publish(user: User | null) {
  snapshot = {
    configured: isSupabaseConfigured,
    loading: false,
    user,
  };
  for (const listener of listeners) {
    listener();
  }
}

function initialize() {
  if (initialized) {
    return;
  }
  initialized = true;

  const client = getSupabaseBrowserClient();
  if (!client) {
    publish(null);
    return;
  }

  void client.auth.getSession().then(({ data }) => {
    publish(data.session?.user ?? null);
  });

  const { data } = client.auth.onAuthStateChange((_event, session) => {
    publish(session?.user ?? null);
  });
  unsubscribeAuth = () => data.subscription.unsubscribe();
}

export function subscribeAuth(listener: () => void) {
  initialize();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      unsubscribeAuth?.();
      unsubscribeAuth = undefined;
      initialized = false;
      snapshot = INITIAL_SNAPSHOT;
    }
  };
}

export function getAuthSnapshot() {
  return snapshot;
}

export function getServerAuthSnapshot(): AuthSnapshot {
  return INITIAL_SNAPSHOT;
}

export async function signInWithGitHub() {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return { error: "尚未設定 Supabase。" };
  }

  const callback = new URL("/auth/callback", window.location.origin);
  callback.searchParams.set("next", "/dashboard");
  const { error } = await client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: callback.toString(),
      scopes: "read:user user:email",
    },
  });

  return { error: error?.message };
}

export async function signOutCloudAccount() {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return;
  }

  await client.auth.signOut();
}

export async function getAccessToken() {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return null;
  }

  const { data } = await client.auth.getSession();
  return data.session?.access_token ?? null;
}
