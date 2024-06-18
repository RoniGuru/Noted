import React from 'react';
import { categoryIF } from '../../utils/interfaces';
import { useState } from 'react';
import { colors } from '../../utils/colors';
import { TiDelete } from 'react-icons/ti';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { updateCategory } from '../../state/category';

interface EditCategoryProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  category: categoryIF | undefined;
}
const EditCategory: React.FC<EditCategoryProps> = ({
  trigger,
  setTrigger,
  category,
}) => {
  const [name, setName] = useState<string>(category!.name);
  const [color, setColor] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedName = name || category!.name;
    const updateColor = color || category!.color;
    console.log(updatedName, updateColor);
    const UpdatedCategory: categoryIF = {
      id: category!.id,
      name: updatedName,
      color: updateColor,
    };

    dispatch(updateCategory(UpdatedCategory));

    setTrigger(false);
  };

  return (
    <>
      {trigger ? (
        <div
          className="create-form-background"
          onClick={() => setTrigger(false)}
        >
          <form
            className="create-form  shadow-md rounded px-8 pt-6 pb-8 mb-4 "
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              className="py-2 px-4 rounded w-full mt-6"
              id="color"
              name="color"
              value={color || category!.color}
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
              edit category
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default EditCategory;
