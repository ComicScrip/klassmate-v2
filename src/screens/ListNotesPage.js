import qs from 'query-string';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import KlassmateAPI from '../KlassmateAPI';

export default function ListNotesPage() {
  const location = useLocation();
  const history = useHistory();
  const [noteList, setNoteList] = useState([]);
  const filters = qs.parse(location.search);

  useEffect(() => {
    const url = filters.q ? `/notes?titleContains=${filters.q}` : '/notes';
    KlassmateAPI.get(url).then((res) => setNoteList(res.data));
  }, [location]);

  return (
    <div>
      <ul>
        <input
          placeholder="Search"
          value={filters.q || ''}
          onChange={(e) => {
            history.push(`/notes?q=${e.target.value}`);
          }}
        />
        {noteList.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
