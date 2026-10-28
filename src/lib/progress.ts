export const HINT_STAGE_COUNT = 5;

export type HintLevel = 0 | 1 | 2 | 3 | 4 | 5;

export function getNextHintLevel(current: number): HintLevel {
  return Math.min(HINT_STAGE_COUNT, Math.max(0, current) + 1) as HintLevel;
}

export interface LocalProgress {
  completedLessons: string[];
  completedExercises: string[];
  hintLevels: Record<string, number>;
  drafts: Record<string, string>;
  lastLessonSlug?: string;
  lastExerciseSlug?: string;
}

const STORAGE_KEY = "cpp-lab-progress-v1";

export const EMPTY_PROGRESS: LocalProgress = {
  completedLessons: [],
  completedExercises: [],
  hintLevels: {},
  drafts: {},
};

export function readLocalProgress(): LocalProgress {
  if (typeof window === "undefined") {
    return EMPTY_PROGRESS;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return EMPTY_PROGRESS;
    }

    const parsed = JSON.parse(stored) as Partial<LocalProgress>;
    return {
      completedLessons: parsed.completedLessons ?? [],
      completedExercises: parsed.completedExercises ?? [],
      hintLevels: parsed.hintLevels ?? {},
      drafts: parsed.drafts ?? {},
      lastLessonSlug: parsed.lastLessonSlug,
      lastExerciseSlug: parsed.lastExerciseSlug,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeLocalProgress(progress: LocalProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent("cpp-lab-progress"));
}

export function uniquePush(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}
