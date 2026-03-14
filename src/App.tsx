import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

type Role = "student" | "mentor";

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

type User = Student | Mentor
type AddUser = Partial<Omit<User, "id">>

const commonKeys = [
  "name",
  "role",
  "email",
  "age",
  "postCode",
  "phone",
  "hobbies",
  "url"
] as const;

type CommonKey = typeof commonKeys[number]

const studentKeys = [
  "studyMinutes",
  "taskCode",
  "studyLangs",
  "score"
] as const;

type StudentKey = typeof studentKeys[number]

const mentorKeys = [
  "experienceDays",
  "useLangs",
  "availableStartCode",
  "availableEndCode"
] as const;

type MentorKey = typeof mentorKeys[number];

type UserInputKey = CommonKey | StudentKey | MentorKey;

const keys: UserInputKey[] = [
  "name",
  "role",
  "email",
  "age",
  "postCode",
  "phone",
  "hobbies",
  "url",
  "studyMinutes",
  "taskCode",
  "studyLangs",
  "score",
  "experienceDays",
  "useLangs",
  "availableStartCode",
  "availableEndCode"
]

type NumericKey = {
  [K in keyof User]
  : User[K] extends number
  ? K : never
}[keyof User]

function App() {
  const USER_LIST: User[] = [
    { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
    { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
    { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
    { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
    { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
    { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
    { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
    { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
  ]

  const [list,setList] = useState<"all"|Role>("all")
  const [isActive,setIsActive] = useState(false)

  const [sortKey,setSortKey] = useState<NumericKey | null>(null)
  const [sortOrder,setSortOrder] = useState<"asc"|"desc">("asc")

  const [addUser,setAddUser] = useState<AddUser>({})
  const [userList,setUserList] = useState<User[]>(USER_LIST)
  
  const sortedUsers = [...userList].sort((a,b)=>{
    if(!sortKey) return 0

    const A = a[sortKey]
    const B = b[sortKey]

    if(typeof A !== "number" || typeof B !== "number") return 0

    return sortOrder === "asc" ? A - B : B - A
  })

  const handleChange = (key: UserInputKey, value: unknown)=>{
    setAddUser(prev=>({
    ...prev,
    [key]:value
    }))
  }

  const handleAddUser = () => {
    if(!addUser.role) return

    const newUser:User = {
      ...(addUser as User),
      id:Date.now()
    }

    setUserList(prev=>[...prev,newUser])
    setAddUser({})
    setIsActive(false)
  }

  const isDisabled = (key: UserInputKey)=>{
    if(!addUser.role) return false

    if(addUser.role === "student"){
      return mentorKeys.includes(key as MentorKey)
    }

    if(addUser.role === "mentor"){
      return studentKeys.includes(key as StudentKey)
    }
    return false
  }

  const isFormComplete = ()=>{
    if(!addUser.role) return false

    let requiredKeys: UserInputKey[] = [...commonKeys]

    if (addUser.role === "student") {
      requiredKeys = [...requiredKeys, ...studentKeys]
    }

    if (addUser.role === "mentor") {
      requiredKeys = [...requiredKeys, ...mentorKeys]
    }

    return requiredKeys.every(key => (
      addUser as Record<UserInputKey, unknown>
    )[key] !== undefined)

  }

  return (
    <>
      <button className="btn btn-light m-3" onClick={()=>setIsActive(!isActive)}>新しく追加する</button>
      {isActive && 
      <div className='container w-25 mt-3 mb-5 d-flex flex-column'>
        {keys.map(key => (
            <>
              <div key={key}>{key}</div>
              {key==="role" ? 
              <select
                value={addUser.role || ""}
                onChange={(e) => handleChange("role", e.target.value as Role)}
              >
                <option value="">--- 選択してください ---</option>
                <option value="student">student</option>
                <option value="mentor">mentor</option>
              </select> :
              <input
                type="text"
                value={String((addUser as Record<UserInputKey, unknown>)[key] ?? "")}
                disabled={isDisabled(key)}
                required={!isDisabled(key)}
                onChange={(e) => handleChange(key, e.target.value)}
              />
              }
            </>
          ))}
        {isFormComplete() && (
          <button
            className="btn btn-light mt-4"
            onClick={handleAddUser}
          >
            Add
          </button>
        )}
      </div>}

      <div className='container mt-3 mb-4'>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className={`nav-link ${list === "all" && "active"}`} onClick={() => setList("all")}>All-list</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${list === "mentor" && "active"}`} onClick={() => setList("mentor")}>Mentor-only</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${list === "student" && "active"}`} onClick={() => setList("student")}>Student-only</a>
          </li>
        </ul>
      </div>

      {list === "student" &&
      <>
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">score
          <button className="btn btn-outline-primary me-md-2" type="button" onClick={()=>{
            setSortKey("score" as NumericKey)
            setSortOrder("asc")}}>Asc</button>
          <button className="btn btn-outline-primary" type="button" onClick={()=>{
            setSortKey("score" as NumericKey)
            setSortOrder("desc")}}>Desc</button>
        </div>
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">studyMinutes
          <button className="btn btn-outline-primary me-md-2" type="button" onClick={()=>{
            setSortKey("studyMinutes" as NumericKey)
            setSortOrder("asc")}}>Asc</button>
          <button className="btn btn-outline-primary" type="button" onClick={()=>{
            setSortKey("studyMinutes" as NumericKey)
            setSortOrder("desc")}}>Desc</button>
        </div>
      </> 
      }
      {list === "mentor" &&
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">experienceDays
          <button className="btn btn-outline-primary me-md-2" type="button" onClick={()=>{
            setSortKey("experienceDays" as NumericKey)
            setSortOrder("asc")}}>Asc</button>
          <button className="btn btn-outline-primary" type="button" onClick={()=>{
            setSortKey("experienceDays" as NumericKey)
            setSortOrder("desc")}}>Desc</button>
        </div>
      }

      <table className='m-2 table'>
        <thead className='text-break table-light'>
          <tr>
          {keys.map(tHeader => (
              <th>{tHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody className='text-break'>
          {sortedUsers
          .filter(user => list === "all" || user.role === list)
          .map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.postCode}</td>
                <td>{user.phone}</td>
                <td>{user.hobbies}</td>
                <td>{user.url}</td>
                <td>{'studyMinutes' in user ? user.studyMinutes : ""}</td>
                <td>{'taskCode' in user ? user.taskCode : ""}</td>
                <td>{'studyLangs' in user ? user.studyLangs.join(",") : ""}</td>
                <td>{'score' in user ? user.score : ""}</td>
                <td>{'experienceDays' in user ? user.experienceDays : ""}</td>
                <td>{'useLangs' in user ? user.useLangs.join(",") : ""}</td>
                <td>{'availableStartCode' in user ? user.availableStartCode : ""}</td>
                <td>{'availableEndCode' in user ? user.availableEndCode : ""}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default App
