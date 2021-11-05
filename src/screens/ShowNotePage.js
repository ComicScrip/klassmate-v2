import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getNote } from '../KlassmateAPI';

export default function ShowNotePage() {
  const { id } = useParams();
  const [note, setNote] = useState();

  useEffect(() => {
    getNote(id).then((n) => setNote(n));
  }, []);

  if (!note) return <CircularProgress />;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
