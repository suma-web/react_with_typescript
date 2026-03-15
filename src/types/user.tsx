type Role = "student" | "mentor"

type BaseUser = {
  id: number
  name: string
  role: Role
  email: string
  age: number
  postCode: string
  phone: string
  hobbies: string[]
  url: string
}

type Student = BaseUser & {
  role: "student"
  studyMinutes: number
  taskCode: number
  studyLangs: string[]
  score: number
}

type Mentor = BaseUser & {
  role: "mentor"
  experienceDays: number
  useLangs: string[]
  availableStartCode: number
  availableEndCode: number
}

export type User = Student | Mentor