import React from 'react';
import { categoryIF } from '../pages/Home';
import { useState } from 'react';
import api from '../api';
import '../styles/Note.css';

interface CreateNoteProps {
  categories: categoryIF[];
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  getNotes: () => void;
}
const CreateNote: React.FC<CreateNoteProps> = ({
  categories,
  trigger,
  setTrigger,
  getNotes,
}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);

  const createNote = async (e: any) => {
    console.log('this is cat', category);
    e.preventDefault();
    if (category === 'none') setCategory(null);

    api
      .post('/base/notes/', { title, body: '', category })
      .then((res) => {
        if (res.status === 201) {
          setTitle('');
          setCategory('');
          getNotes();
          setTrigger(false);
        }
      })
      .catch((err) => {
        alert(err), console.log('its over');
      });
  };

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCategory(value === 'none' ? null : value);
  };

  return (
    <>
      {trigger ? (
        <div className="note-form-background" onClick={() => setTrigger(false)}>
          <form
            action=""
            className="note-form"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setTrigger(false)}>close</button>
            <label htmlFor="title">Note title</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <select
              id="choices"
              onChange={handleCategoryChange}
              value={category!}
            >
              <option key={'none'} value={'none'}>
                none
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button onClick={createNote}>create note</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateNote;
