import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { categoryIF } from '../../utils/interfaces';

interface CreateNoteProps {
  categories: categoryIF[];
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  createNote: (title: string, category: number | null) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({
  categories,
  trigger,
  setTrigger,
  createNote,
}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('none');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let convertedCategory: number | null = null;
    if (category !== 'none') {
      convertedCategory = Number(category);
    }

    createNote(title, convertedCategory);

    setTitle('');
    setCategory('none');
    setTrigger(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
  };

  return (
    <>
      {trigger ? (
        <div
          className="create-form-background"
          onClick={() => setTrigger(false)}
        >
          <form
            action=""
            className="create-form shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <TiDelete
              onClick={() => setTrigger(false)}
              size={40}
              className="icon-button ml-auto"
            />

            <input
              type="text"
              placeholder="title"
              className="mt-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <select
              id="choices"
              onChange={handleCategoryChange}
              value={category}
              className="py-2 px-4 rounded w-full mt-6"
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
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-6"
            >
              create note
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateNote;
