import React, { useEffect } from 'react';
import { NoteIF, categoryIF } from '../pages/Home';
import '../styles/Note.css';

interface NoteProps {
  note: NoteIF;
  category: categoryIF | undefined;
  noteDelete: (id: number) => void;

  setCurrentNoteID: React.Dispatch<React.SetStateAction<number | null>>;
}

const NoteHeader: React.FC<NoteProps> = ({
  note,
  noteDelete,
  category,
  setCurrentNoteID,
}) => {
  const [title, setTitle] = React.useState<string>('');

  useEffect(() => {
    setTitle(note.title);
  }, []);

  return (
    <div
      key={note.id}
      style={{ backgroundColor: category?.color || 'grey' }}
      className="note-header"
    >
      <div>{title}</div>

      <button
        onClick={() => {
          noteDelete(note.id), setCurrentNoteID(null);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default NoteHeader;
