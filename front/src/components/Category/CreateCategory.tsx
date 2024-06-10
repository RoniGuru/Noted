import { useState, useEffect } from 'react';

import { ColorChoice } from '../../utils/interfaces';
import { TiDelete } from 'react-icons/ti';
import '../../styles/CreateCategory.css';

interface CreateCategoryProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  colorChoices: ColorChoice[];
  createCategory: (categoryName: string, categoryColor: string) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  trigger,
  setTrigger,
  colorChoices,
  createCategory,
}) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (colorChoices.length > 0) {
      setColor(colorChoices[0].value);
    }
  }, [colorChoices]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createCategory(name, color);
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
              {colorChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.display_name}
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
