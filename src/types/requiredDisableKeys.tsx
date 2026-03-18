import type { Mentor, Student } from "./user";


export const studentRequired = [
  "id","name","email","age","postCode","phone","hobbies","url",
  "studyMinutes","taskCode","studyLangs","score"
] as const satisfies readonly (keyof Student)[];

export const mentorRequired = [
  "id","name","email","age","postCode","phone","hobbies","url",
  "experienceDays","useLangs","availableStartCode","availableEndCode"
] as const satisfies readonly (keyof Mentor)[]