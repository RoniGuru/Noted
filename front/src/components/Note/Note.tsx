import { useEffect, useState } from 'react';
import { NoteIF } from '../../utils/interfaces';

import { TiDelete } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { updateNote } from '../../state/note';

interface NoteProps {
  note: NoteIF;
  setCurrentNoteID: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentCategoryID: React.Dispatch<React.SetStateAction<number | null>>;
}

const Note: React.FC<NoteProps> = ({
  note,

  setCurrentNoteID,
  setCurrentCategoryID,
}) => {
  const categories = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [category, setCategory] = useState<number | undefined | null>(
    note.category
  );

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, []);

  const handleSubmit = async () => {
    const updatedTitle = title || note.title;
    const updatedBody = body || note.body;
    const updatedCategory = category == 0 ? null : category || note.category;

    dispatch(
      updateNote({
        id: note.id,
        title: updatedTitle,
        body: updatedBody,
        category: updatedCategory,
      })
    );

    setTitle(updatedTitle);
    setBody(updatedBody);
    setCategory(updatedCategory);
    setCurrentCategoryID(updatedCategory);
  };

  const reset = () => {
    setTitle(note.title);
    setBody(note.body);
    setCategory(note.category);
  };

  return (
    <div key={note.id} className="flex flex-col h-full w-full">
      <div className="  flex justify-between">
        <button
          onClick={() => reset()}
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded"
        >
          reset
        </button>

        <TiDelete
          size={30}
          className="icon-button"
          onClick={() => setCurrentNoteID(null)}
        />
      </div>
      <div className="w-full flex justify-between items-center mt-2">
        <input
          className="w-4/5  h-10 outline-none bg-transparent  pl-2 border-b-4"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="h-10 outline-none rounded mr-2"
          id="choices"
          value={
            category === null || category === 0
              ? 0
              : category ?? note.category ?? 0
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
        className=" h-3/5 mt-2 rounded outline-none  pl-2 bg-transparent"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="ml-auto">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded mt-4"
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Note;
