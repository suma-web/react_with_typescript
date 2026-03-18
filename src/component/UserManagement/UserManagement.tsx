import 'bootstrap/dist/css/bootstrap.min.css';
import { userLists } from '../../data/userLists';
import { ListAdd } from '../List/UserForm';
import type { User } from '../../types/user';
import { useState } from 'react';
import { ListShow } from '../List/UserList';

export const ListEdit = () => {
  const [userList, setUserList] = useState<User[]>(userLists);

  return (
    <div className='container'>
      <ListAdd setUserList={setUserList} />
      <ListShow userList={userList}/>
    </div>
  );
};
