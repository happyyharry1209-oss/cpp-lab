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

    return normalizeProgress(JSON.parse(stored));
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function normalizeProgress(value: unknown): LocalProgress {
  if (!value || typeof value !== "object") {
    return EMPTY_PROGRESS;
  }

  const parsed = value as Partial<LocalProgress>;
  return {
    completedLessons: Array.isArray(parsed.completedLessons)
      ? parsed.completedLessons.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    completedExercises: Array.isArray(parsed.completedExercises)
      ? parsed.completedExercises.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    hintLevels:
      parsed.hintLevels && typeof parsed.hintLevels === "object"
        ? parsed.hintLevels
        : {},
    drafts:
      parsed.drafts && typeof parsed.drafts === "object"
        ? parsed.drafts
        : {},
    lastLessonSlug:
      typeof parsed.lastLessonSlug === "string"
        ? parsed.lastLessonSlug
        : undefined,
    lastExerciseSlug:
      typeof parsed.lastExerciseSlug === "string"
        ? parsed.lastExerciseSlug
        : undefined,
  };
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

export function mergeProgress(
  local: LocalProgress,
  cloud: LocalProgress,
): LocalProgress {
  const lessonSlugs = new Set([
    ...local.completedLessons,
    ...cloud.completedLessons,
  ]);
  const exerciseSlugs = new Set([
    ...local.completedExercises,
    ...cloud.completedExercises,
  ]);
  const hintSlugs = new Set([
    ...Object.keys(local.hintLevels),
    ...Object.keys(cloud.hintLevels),
  ]);
  const draftSlugs = new Set([
    ...Object.keys(local.drafts),
    ...Object.keys(cloud.drafts),
  ]);

  const hintLevels: Record<string, number> = {};
  for (const slug of hintSlugs) {
    hintLevels[slug] = Math.max(
      local.hintLevels[slug] ?? 0,
      cloud.hintLevels[slug] ?? 0,
    );
  }

  const drafts: Record<string, string> = {};
  for (const slug of draftSlugs) {
    const localDraft = local.drafts[slug];
    drafts[slug] =
      localDraft && localDraft.trim()
        ? localDraft
        : (cloud.drafts[slug] ?? "");
  }

  return {
    completedLessons: [...lessonSlugs],
    completedExercises: [...exerciseSlugs],
    hintLevels,
    drafts,
    lastLessonSlug: local.lastLessonSlug ?? cloud.lastLessonSlug,
    lastExerciseSlug: local.lastExerciseSlug ?? cloud.lastExerciseSlug,
  };
}
