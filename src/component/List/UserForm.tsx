import { useState } from 'react';
import { userList } from '../../data/userLists';
import type { User } from '../../types/user';
import { mentorRequired, studentRequired } from '../../types/requiredDisableKeys';

type Props = {
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

export const UserForm = ({ setUserList }: Props) => {
  const [addUser, setAddUser] = useState<Partial<User>>({});

  const isDisabled = (key: string) => {
    const role = addUser.role;

    if (!role) return true;

    if (role === 'student') {
      return !studentRequired.includes(key);
    }

    if (role === 'mentor') {
      return !mentorRequired.includes(key);
    }

    return true;
  };

  const userListKeys = [
    ...new Set(userList.flatMap((user) => Object.keys(user)).filter((key) => key !== 'id')),
  ];

  const handleChange = (key: keyof User, value: string) => {
    setAddUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddUser = () => {
    const newUser = {
      ...addUser,
      id: Date.now(),
    } as User;

    setUserList((prev) => [...prev, newUser]);

    setAddUser({});
  };

  return (
    <>
      {userListKeys.map((key) => (
        <div key={key} className="p-1 d-flex flex-column">
          <label className="m-1">{key}</label>
          {key === 'role' ? (
            <select
              onChange={(e) => handleChange('role', e.target.value)}
              value={addUser.role ?? ''}
              className="p-2"
            >
              <option value="">select role</option>
              <option value="student">student</option>
              <option value="mentor">mentor</option>
            </select>
          ) : (
            <input
              type="text"
              value={addUser[key as keyof User] ?? ''}
              disabled={isDisabled(key)}
              required={!isDisabled(key)}
              onChange={(e) => handleChange(key as keyof User, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="d-grid gap-2">
        <button className="btn btn-primary mt-4 mb-4 p-2" type="button" onClick={handleAddUser}>
          Add
        </button>
      </div>
    </>
  );
};
