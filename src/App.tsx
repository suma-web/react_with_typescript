import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  type Student = {
    id: number;
    name: string;
    role: string;
    email: string;
    age: number;
    postCode: string;
    phone: string;
    hobbies: string[];
    url: string;
    studyMinutes: number;
    taskCode: number;
    studyLangs: string[];
    score: number;
    experienceDays?: undefined;
    useLangs?: undefined;
    availableStartCode?: undefined;
    availableEndCode?: undefined;
  } 
  type Mentor = {
    id: number;
    name: string;
    role: string;
    email: string;
    age: number;
    postCode: string;
    phone: string;
    hobbies: string[];
    url: string;
    experienceDays: number;
    useLangs: string[];
    availableStartCode: number;
    availableEndCode: number;
    studyMinutes?: undefined;
    taskCode?: undefined;
    studyLangs?: undefined;
    score?: undefined;
  }

  type T = Student | Mentor

  const USER_LIST: T[] = [
    { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
    { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
    { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
    { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
    { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
    { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
    { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
    { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
  ]

  const [list, setList] = useState("all");
  const [isActive, setIsActive] = useState(false);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [addUser, setAddUser] = useState<any>({});
  const [userList, setUserList] = useState<T[]>(USER_LIST);

  const keys = [
    ...new Set(
      USER_LIST
      .flatMap(user => Object.keys(user))
      .filter(key => key != "id")
    )
  ]
  
  const sortedUsers = [...USER_LIST]
  .filter(user => user.role !== "all")
  .sort((a, b) => {
    if (!sortKey) return 0

    const A = a[sortKey as keyof T] ?? 0
    const B = b[sortKey as keyof T] ?? 0

    if (sortOrder === "asc") {
      return Number(A) - Number(B)
    } else {
      return Number(B) - Number(A)
    }
  })

  const handleChange = (key: string, value: string) => {
    setAddUser({
      ...addUser,
      [key]: value
    })
  }

  const handleAddUser = () => {
    setUserList([...userList, { id: Date.now(), ...addUser }])
    setAddUser({})
  }

  return (
    <>
      <button className="btn btn-light m-2" onClick={()=>setIsActive(!isActive)}>新しく追加する</button>
      {isActive && 
      <div className='container mt-3 d-flex flex-column'>
        {keys.map(key => (
            <>
              <label>{key}</label>
              <input
                type="text"
                value={addUser[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </>
          ))}
        <button className="btn btn-light mt-4" onClick={handleAddUser}>追加</button>
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
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">スコア
          <button className="btn btn-primary me-md-2" type="button" onClick={()=>{
            setSortKey("score")
            setSortOrder("asc")}}>昇順</button>
          <button className="btn btn-primary" type="button" onClick={()=>{
            setSortKey("score")
            setSortOrder("desc")}}>降順</button>
        </div>
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">勉強時間
          <button className="btn btn-primary me-md-2" type="button" onClick={()=>{
            setSortKey("score")
            setSortOrder("asc")}}>昇順</button>
          <button className="btn btn-primary" type="button" onClick={()=>{
            setSortKey("score")
            setSortOrder("desc")}}>降順</button>
        </div>
      </> 
      }
      {list === "mentor" &&
        <div className="m-2 d-grid gap-2 d-md-flex justify-content-md-end">実務経験月数
          <button className="btn btn-primary me-md-2" type="button" onClick={()=>{
            setSortKey("experienceDays")
            setSortOrder("asc")}}>昇順</button>
          <button className="btn btn-primary" type="button" onClick={()=>{
            setSortKey("experienceDays")
            setSortOrder("desc")}}>降順</button>
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
                <td>{user.studyMinutes}</td>
                <td>{user.taskCode}</td>
                <td>{user.studyLangs}</td>
                <td>{user.score}</td>
                <td>{user.experienceDays}</td>
                <td>{user.useLangs}</td>
                <td>{user.availableStartCode}</td>
                <td>{user.availableEndCode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default App
