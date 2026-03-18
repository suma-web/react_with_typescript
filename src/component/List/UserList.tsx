import { useState } from 'react';
import type { User, UserRole } from '../../types/user';
import type { SortKey } from '../../data/user';
import { SortButtons } from '../SortButtons/SortButtons';

type Props = {
  userList: User[];
};

export const UserList = ({ userList }: Props) => {
  const [activeTab, setActiveTab] = useState<'all' | UserRole>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey | null;
    order: 'asc' | 'desc';
  }>({
    key: null,
    order: 'asc',
  });

  const filteredUsers =
    activeTab === 'all' ? userList : userList.filter((user) => user.role === activeTab);

  const handleSort = (key: SortKey, order: 'asc' | 'desc') => {
    setSortConfig({ key, order });
  };

  const sortedUsers = filteredUsers.toSorted((a, b) => {
    if (!sortConfig.key) return 0;

    const key = sortConfig.key;

    if (!(key in a) || !(key in b)) return 0;

    const aValue = (a as Record<string, unknown>)[key];
    const bValue = (b as Record<string, unknown>)[key];

    if (typeof aValue !== 'number' || typeof bValue !== 'number') return 0;

    return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All-lists
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => setActiveTab('student')}
          >
            Student
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'mentor' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentor')}
          >
            Mentor
          </a>
        </li>
      </ul>

      {activeTab === 'student' && (
        <>
          <SortButtons kind="studyMinutes" handleSort={handleSort} />
          <SortButtons kind="score" handleSort={handleSort} />
        </>
      )}

      {activeTab === 'mentor' && <SortButtons kind="experienceDays" handleSort={handleSort} />}

      {sortedUsers.map((item) => (
        <ul key={item.id} className="list-group p-4">
          <li className="list-group-item">{item.name}</li>
          <li className="list-group-item">{item.role}</li>
          <li className="list-group-item">{item.email}</li>
          <li className="list-group-item">{item.age}</li>
          <li className="list-group-item">{item.postCode}</li>
          <li className="list-group-item">{item.phone}</li>
          <li className="list-group-item">{item.hobbies}</li>
          <li className="list-group-item">{item.url}</li>
          <li className="list-group-item">{item.studyMinutes ?? ""}</li>
          <li className="list-group-item">{item.studyLangs ?? ""}</li>
          <li className="list-group-item">{item.taskCode ?? ""}</li>
          <li className="list-group-item">{item.score ?? ""}</li>
          <li className="list-group-item">{item.experienceDays ?? ""}</li>
          <li className="list-group-item">{item.useLangs ?? ""}</li>
          <li className="list-group-item">{item.availableStartCode ?? ""}</li>
          <li className="list-group-item">{item.availableEndCode ?? ""}</li>
        </ul>
      ))}
    </>
  );
};
