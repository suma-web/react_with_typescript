import 'bootstrap/dist/css/bootstrap.min.css';
import { userLists } from '../../data/userLists';
import { ListAdd } from '../List/ListAdd';
import type { User } from '../../types/user';
import { useState } from 'react';
import { ListShow } from '../List/ListShow';

export const Table = () => {
  const [userList, setUserList] = useState<User[]>(userLists);

  return (
    <div className='container'>
      <ListAdd setUserList={setUserList} />
      <ListShow userList={userList}/>
    </div>
  );
};
