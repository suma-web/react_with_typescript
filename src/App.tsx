import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { USER_LIST } from './data/users';
import type { User } from './types/user';
import { useState } from 'react';

function App() {
  const [users] = useState<User[]>(USER_LIST);
  const keys = [...new Set(users.flatMap((user) => Object.keys(user)))].filter(
    (key) => key !== 'id'
  ) as Omit<keyof User, 'id'>[];

  return (
    <>
      <h1>User List</h1>

      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.postCode}</td>
              <td>{user.phone}</td>
              <td>
                {user.hobbies.map((hobby) => (<div>{hobby}</div>))}
              </td>
              <td>{user.url}</td>
              <td>{'studyMinutes' in user ? user.studyMinutes : ''}</td>
              <td>{'taskCode' in user ? user.taskCode : ''}</td>
              <td>
                {'studyLangs' in user ? user.studyLangs.map((sLan) => <div>{sLan}</div>) : ''}
              </td>
              <td>{'score' in user ? user.taskCode : ''}</td>
              <td>{'experienceDays' in user ? user.experienceDays : ''}</td>
              <td>{'useLangs' in user ? user.useLangs.map((uLan) => <div>{uLan}</div>) : ''}</td>
              <td>{'availableStartCode' in user ? user.availableStartCode : ''}</td>
              <td>{'availableEndCode' in user ? user.availableEndCode : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
