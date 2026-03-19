import 'bootstrap/dist/css/bootstrap.min.css';
import { userList } from '../../data/userList';
import { UserForm } from '../List/UserForm';
import type { User } from '../../types/user';
import { useState } from 'react';
import { UserList } from '../List/UserList';

export const UserManagement = () => {
  const [userListItem, setUserListItem] = useState<User[]>(userList);

  return (
    <div className="container">
      <UserForm setUserListItem={setUserListItem} />
      <UserList userList={userListItem} />
    </div>
  );
};