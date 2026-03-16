import { useState } from 'react';
import type { User } from '../../types/user';

type Props = {
  userList: User[];
};

export const ListShow = ({ userList }: Props) => {
  const [activeTab, setActiveTab] = useState<'all' | 'student' | 'mentor'>('all');

  const filteredUsers =
    activeTab === 'all' ? userList : userList.filter((user) => user.role === activeTab);

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
            <button className="btn btn-primary me-md-2" type="button">
              Asc
            </button>
            <button className="btn btn-secondary" type="button">
              Desc
            </button>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <label>score</label>
            <button className="btn btn-primary me-md-2" type="button">
              Asc
            </button>
            <button className="btn btn-secondary" type="button">
              Desc
            </button>
          </div>
        </>
      )}

      {activeTab === 'mentor' && (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <label>experienceDays</label>
          <button className="btn btn-primary me-md-2" type="button">
            Asc
          </button>
          <button className="btn btn-secondary" type="button">
            Desc
          </button>
        </div>
      )}

      {filteredUsers.map((list) => (
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
