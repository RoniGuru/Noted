import { useState } from 'react';
import { categoryIF, ColorChoice } from '../utils/interfaces';
import '../styles/Category.css';
import api from '../api';
import EditCategory from '../components/EditCategory';
import { TiDelete } from 'react-icons/ti';
import { RiEditCircleFill } from 'react-icons/ri';

interface CategoriesProps {
  category: categoryIF;
  deleteCategory: (id: number) => void;
  colorChoices: ColorChoice[];
  getCategories: () => void;
  current: number | null;
}

const Category: React.FC<CategoriesProps> = ({
  category,
  deleteCategory,
  colorChoices,
  getCategories,
  current,
}) => {
  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);

  const updateCategory = async (
    id: number | undefined,
    itemName: string,
    itemColor: string
  ) => {
    api
      .put(`/base/categories/update/${id}/`, {
        name: itemName,
        color: itemColor,
      })
      .then(() => {
        getCategories();
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className={`category ${categoryPopUp ? 'category-form-active' : ''}`}
      style={{
        border: category.color + ' 5px solid',
        backgroundColor:
          current === category.id ? category.color : 'transparent',
      }}
      onClick={() => {
        console.log(current, category.id);
      }}
    >
      <div>{category!.name}</div>
      <div className="category-buttons">
        <RiEditCircleFill
          onClick={() => setCategoryPopUp(!categoryPopUp)}
          className="category-button"
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
          className="category-button "
          size={40}
        />
      </div>
    </div>
  );
};

export default Category;
