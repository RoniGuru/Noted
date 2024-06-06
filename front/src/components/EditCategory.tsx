import React from 'react';
import { ColorChoice, categoryIF } from '../pages/Home';
import { useState } from 'react';

import '../styles/Category.css';

interface EditCategoryProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  colorChoices: ColorChoice[];
  category: categoryIF | undefined;
  categoryUpdate: (id: number, itemName: string, itemColor: string) => void;
}
const EditCategory: React.FC<EditCategoryProps> = ({
  trigger,
  setTrigger,
  colorChoices,
  category,
  categoryUpdate,
}) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedName = name || category!.name;
    const updateColor = color || category!.color;
    categoryUpdate(category!.id, updatedName, updateColor);
    setTrigger(false);
  };

  return (
    <>
      {trigger ? (
        <div
          className="category-form-background"
          onClick={() => setTrigger(false)}
        >
          <form className="category-form" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setTrigger(false)}>close</button>
            <input
              className="form-input"
              type="text"
              name="name"
              value={name || category!.name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              className="form-input"
              id="color"
              name="color"
              value={color || category!.color}
              onChange={(e) => setColor(e.target.value)}
            >
              {colorChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.display_name}
                </option>
              ))}
            </select>

            <button onClick={handleSubmit}>edit category</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default EditCategory;
