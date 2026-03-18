import { useState } from 'react';
import type { User, UserRole } from '../../types/user';
import type { SortKey } from '../../data/user';

type Props = {
  userList: User[];
};

export const UserForm = ({ userList }: Props) => {
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <label>studyMinutes</label>
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={() => handleSort('studyMinutes', 'asc')}
            >
              Asc
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => handleSort('studyMinutes', 'desc')}
            >
              Desc
            </button>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <label>score</label>
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={() => handleSort('score', 'asc')}
            >
              Asc
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => handleSort('score', 'desc')}
            >
              Desc
            </button>
          </div>
        </>
      )}

      {activeTab === 'mentor' && (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <label>experienceDays</label>
          <button
            className="btn btn-primary me-md-2"
            type="button"
            onClick={() => handleSort('experienceDays', 'asc')}
          >
            Asc
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => handleSort('experienceDays', 'desc')}
          >
            Desc
          </button>
        </div>
      )}

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
          <li className="list-group-item">{item.studyMinutes ?? ''}</li>
          <li className="list-group-item">{item.studyLangs ?? ''}</li>
          <li className="list-group-item">{item.taskCode ?? ''}</li>
          <li className="list-group-item">{item.score ?? ''}</li>
          <li className="list-group-item">{item.experienceDays ?? ''}</li>
          <li className="list-group-item">{item.useLangs ?? ''}</li>
          <li className="list-group-item">{item.availableStartCode ?? ''}</li>
          <li className="list-group-item">{item.availableEndCode ?? ''}</li>
        </ul>
      ))}
    </>
  );
};
