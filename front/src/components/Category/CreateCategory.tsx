import { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/Category.css';
import { ColorChoice } from '../../utils/interfaces';
import { TiDelete } from 'react-icons/ti';

interface CreateCategoryProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  colorChoices: ColorChoice[];

  getCategories: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  trigger,
  setTrigger,

  colorChoices,
  getCategories,
}) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  useEffect(() => {
    if (colorChoices.length > 0) {
      setColor(colorChoices[0].value);
    }
  }, [colorChoices]);

  const createCategory = (e: any) => {
    e.preventDefault();
    try {
      api
        .post('/base/categories/', { name, color })
        .then((res) => {
          if (res.status === 201) setTrigger(false), getCategories();
          else alert('failed to make category');
        })
        .catch((err) => {
          alert(err), console.log('its over');
        });
    } catch (err: any) {
      alert('An error occurred: ' + err.message);
      console.log('Error details:', err);
    }
  };

  return (
    <>
      {trigger ? (
        <div
          className="category-form-background"
          onClick={() => setTrigger(false)}
        >
          <form className="category-form" onClick={(e) => e.stopPropagation()}>
            <TiDelete onClick={() => setTrigger(false)} size={40} />
            <input
              className="form-input"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <select
              className="form-input"
              id="color"
              name="color"
              onChange={(e) => setColor(e.target.value)}
            >
              {colorChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.display_name}
                </option>
              ))}
            </select>

            <button onClick={createCategory}>create category</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateCategory;
