import React, { useEffect } from 'react';
import { NoteIF, categoryIF } from '../../utils/interfaces';
import api from '../../api';
import '../../styles/Note.css';
import { TiDelete } from 'react-icons/ti';

interface NoteProps {
  note: NoteIF;
  categories: categoryIF[];
  noteDelete: (id: number) => void;
  noteUpdate: (id: number) => void;

  setCurrentNoteID: React.Dispatch<React.SetStateAction<number | null>>;
  getNotes: () => void;
  setCurrentCategoryID: React.Dispatch<React.SetStateAction<number | null>>;
}

const Note: React.FC<NoteProps> = ({
  note,
  categories,
  noteDelete,
  setCurrentNoteID,
  getNotes,
  setCurrentCategoryID,
}) => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [category, setCategory] = React.useState<number | undefined | null>(
    note.category
  );

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, []);

  const updateNote = async (
    id: number,
    title: string,
    body: string,
    category: number | undefined | null
  ) => {
    const updatedTitle = title || note.title;
    const updatedBody = body || note.body;
    const updatedCategory = category == 0 ? null : category || note.category;

    api
      .put(`/base/notes/update/${id}/`, {
        title: updatedTitle,
        body: updatedBody,
        category: updatedCategory,
      })
      .then(() => {
        setTitle(updatedTitle);
        setBody(updatedBody);
        setCategory(updatedCategory);
        setCurrentCategoryID(updatedCategory);
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const reset = () => {
    setTitle(note.title);
    setBody(note.body);
    setCategory(note.category);
  };

  return (
    <div key={note.id} className="note-container">
      <div className="note-container-top">
        <button onClick={() => reset()}>reset</button>

        <TiDelete
          size={30}
          className="note-header-delete"
          onClick={() => {
            noteDelete(note.id), setCurrentNoteID(null);
          }}
        />
      </div>
      <div className="note-title">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          id="choices"
          value={
            category === null || category === 0 ? 0 : category || note.category
          }
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          <option key={'none'} value={0}>
            none
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div className="note-bottom">
        <button
          onClick={() => {
            updateNote(note.id, title, body, category);
          }}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Note;
