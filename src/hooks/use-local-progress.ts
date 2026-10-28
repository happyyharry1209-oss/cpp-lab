"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_PROGRESS,
  readLocalProgress,
  writeLocalProgress,
  type LocalProgress,
} from "@/lib/progress";

export function useLocalProgress() {
  const [progress, setProgress] = useState<LocalProgress>(EMPTY_PROGRESS);

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

  const save = useCallback((next: LocalProgress) => {
    setProgress(next);
    writeLocalProgress(next);
  }, []);

  return { progress, save };
}
