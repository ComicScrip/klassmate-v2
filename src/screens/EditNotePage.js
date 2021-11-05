import { useState } from 'react';

import KlassmateAPI from '../KlassmateAPI';

export default function EditNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    KlassmateAPI.post('/notes', { title, content });
  };

  return (
    <div>
      <form onSubmit={handleNoteSubmit}>
        <label htmlFor="note-title">
          Title :
          <input
            value={title}
            id="note-title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="note-content">
          Content :
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
