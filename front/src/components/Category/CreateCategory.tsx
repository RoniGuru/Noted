import { useState } from 'react';

import { colors } from '../../utils/colors';
import { TiDelete } from 'react-icons/ti';

import { AppDispatch } from '../../state/store';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../state/category';

interface CreateCategoryProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  trigger,
  setTrigger,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(colors[0]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createCategory({ id: 0, name, color: color }));
    setTrigger(false);
  };

  return (
    <>
      {trigger ? (
        <div
          className="create-form-background flex"
          onClick={() => setTrigger(false)}
        >
          <form
            className="create-form   shadow-md rounded px-8 pt-6 pb-8 mb-4   "
            onClick={(e) => e.stopPropagation()}
          >
            <TiDelete
              onClick={() => setTrigger(false)}
              size={40}
              className="icon-button  ml-auto"
            />
            <input
              className=" mt-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <select
              id="color"
              name="color"
              className="py-2 px-4 rounded w-full mt-6"
              onChange={(e) => setColor(e.target.value)}
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-6  "
            >
              create category
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateCategory;
