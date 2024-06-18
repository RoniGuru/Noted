import { useState } from 'react';
import { categoryIF } from '../../utils/interfaces';
import { AppDispatch } from '../../state/store';
import { useDispatch } from 'react-redux';
import EditCategory from './EditCategory';
import { TiDelete } from 'react-icons/ti';
import { RiEditCircleFill } from 'react-icons/ri';
import { deleteCategory } from '../../state/category';

interface CategoriesProps {
  category: categoryIF;
  current: number | null;
}

const Category: React.FC<CategoriesProps> = ({ category, current }) => {
  const [categoryPopUp, setCategoryPopUp] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

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
          category={category}
        />

        <TiDelete
          onClick={() => dispatch(deleteCategory(category))}
          className="icon-button "
          size={40}
        />
      </div>
    </div>
  );
};

export default Category;
