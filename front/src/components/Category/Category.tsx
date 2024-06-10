import { useState } from 'react';
import { categoryIF, ColorChoice } from '../../utils/interfaces';

import EditCategory from './EditCategory';
import { TiDelete } from 'react-icons/ti';
import { RiEditCircleFill } from 'react-icons/ri';

interface CategoriesProps {
  category: categoryIF;
  deleteCategory: (id: number) => void;
  colorChoices: ColorChoice[];
  getCategories: () => void;
  current: number | null;
  updateCategory: (updatedCategory: categoryIF) => void;
}

const Category: React.FC<CategoriesProps> = ({
  category,
  deleteCategory,
  colorChoices,
  current,
  updateCategory,
}) => {
  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);

  return (
    <div
      className={`category ${
        categoryPopUp ? 'category-form-active' : ''
      } grid grid-cols-2 items-center p-6 rounded-lg shadow mt-4   hover:shadow-2xl`}
      style={{
        border: category.color + ' 5px solid',
        backgroundColor:
          current === category.id ? category.color : 'transparent',
      }}
      onClick={() => {
        console.log(current, category.id);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = category.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor =
          current === category.id ? category.color : 'transparent';
      }}
    >
      <div className="ml-4 align-middle">{category!.name}</div>
      <div className="ml-auto flex justify-between gap-4 items-center">
        <RiEditCircleFill
          onClick={() => setCategoryPopUp(!categoryPopUp)}
          className="icon-button"
          size={30}
        />

        <EditCategory
          trigger={categoryPopUp}
          setTrigger={setCategoryPopUp}
          colorChoices={colorChoices}
          category={category}
          categoryUpdate={updateCategory}
        />
        <TiDelete
          onClick={() => deleteCategory(category.id)}
          className="icon-button "
          size={40}
        />
      </div>
    </div>
  );
};

export default Category;
