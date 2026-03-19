import type { SortKey } from '../../data/user';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  kind: SortKey;
  handleSort: (key: SortKey, order: 'asc' | 'desc') => void;
};

export const SortButtons = ({ kind, handleSort }: Props) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
      <label>{kind}</label>
      <button
        className="btn btn-primary me-md-2"
        type="button"
        onClick={() => handleSort(kind, 'asc')}
      >
        Asc
      </button>
      <button className="btn btn-secondary" type="button" onClick={() => handleSort(kind, 'desc')}>
        Desc
      </button>
    </div>
  );
};