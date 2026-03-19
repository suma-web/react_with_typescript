import type { Mentor, Student } from "../types/user";


export type SortableFields = Pick<
  Student & Mentor,
  'studyMinutes' | 'score' | 'experienceDays'
>;

export type SortKey = keyof SortableFields;