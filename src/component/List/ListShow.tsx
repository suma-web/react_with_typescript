import { useState } from 'react';
import type { Mentor, Student, User } from '../../types/user';

type Props = {
  userList: User[];
};

export const ListShow = ({ userList }: Props) => {
  const [activeTab, setActiveTab] = useState<'all' | 'student' | 'mentor'>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student | keyof Mentor | null;
    order: 'asc' | 'desc';
  }>({
    key: null,
    order: 'asc',
  });

  const filteredUsers =
    activeTab === 'all' ? userList : userList.filter((user) => user.role === activeTab);

  const handleSort = (key: keyof Student | keyof Mentor, order: 'asc' | 'desc') => {
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

      {sortedUsers.map((list) => (
        <ul key={list.id} className="list-group p-4">
          <li className="list-group-item">{list.name}</li>
          <li className="list-group-item">{list.role}</li>
          <li className="list-group-item">{list.email}</li>
          <li className="list-group-item">{list.age}</li>
          <li className="list-group-item">{list.postCode}</li>
          <li className="list-group-item">{list.phone}</li>
          <li className="list-group-item">{list.hobbies}</li>
          <li className="list-group-item">{list.url}</li>
          <li className="list-group-item">{('studyMinutes' in list && list.studyMinutes) || ''}</li>
          <li className="list-group-item">{('studyLangs' in list && list.studyLangs) || ''}</li>
          <li className="list-group-item">{('taskCode' in list && list.taskCode) || ''}</li>
          <li className="list-group-item">{('score' in list && list.score) || ''}</li>
          <li className="list-group-item">
            {('experienceDays' in list && list.experienceDays) || ''}
          </li>
          <li className="list-group-item">{('useLangs' in list && list.useLangs) || ''}</li>
          <li className="list-group-item">
            {('availableStartCode' in list && list.availableStartCode) || ''}
          </li>
          <li className="list-group-item">
            {('availableEndCode' in list && list.availableEndCode) || ''}
          </li>
        </ul>
      ))}
    </>
  );
};
