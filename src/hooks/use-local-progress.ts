"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_PROGRESS,
  mergeProgress,
  normalizeProgress,
  readLocalProgress,
  writeLocalProgress,
  type LocalProgress,
} from "@/lib/progress";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "./use-auth";

export function useLocalProgress() {
  const [progress, setProgress] = useState<LocalProgress>(EMPTY_PROGRESS);
  const { user } = useAuth();

  useEffect(() => {
    const update = () => setProgress(readLocalProgress());
    update();
    window.addEventListener("storage", update);
    window.addEventListener("cpp-lab-progress", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cpp-lab-progress", update);
    };
  }, []);

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    if (!client || !user) {
      return;
    }

    let cancelled = false;
    const loadCloudProgress = async () => {
      const { data, error } = await client
        .from("user_progress")
        .select("payload")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled || error) {
        return;
      }

      const merged = mergeProgress(
        readLocalProgress(),
        normalizeProgress(data?.payload),
      );
      setProgress(merged);
      writeLocalProgress(merged);
    };

    void loadCloudProgress();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const save = useCallback(
    (next: LocalProgress) => {
      setProgress(next);
      writeLocalProgress(next);

      const client = getSupabaseBrowserClient();
      if (client && user) {
        void client.from("user_progress").upsert({
          user_id: user.id,
          payload: next,
          updated_at: new Date().toISOString(),
        });
      }
    },
    [user],
  );

  return { progress, save };
}
