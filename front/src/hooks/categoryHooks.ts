import { useState, useEffect, useMemo } from 'react';
import { categoryIF } from '../utils/interfaces';
import api from '../api';

const useCategory = () => {
  const [categories, setCategories] = useState<categoryIF[]>([]);

  const getCategories = async () => {
    api.get('/base/categories/').then((response) => {
      setCategories(response.data);
    });
  };

  const createCategory = async (
    categoryName: string,
    categoryColor: string
  ) => {
    api
      .post('/base/categories/', { name: categoryName, color: categoryColor })
      .then((res: any) => {
        if (res.status === 201) {
          let updatedCategories = [...categories];
          updatedCategories.push({
            id: res.data.id,
            name: categoryName,
            color: categoryColor,
          });
          setCategories(updatedCategories);
        }
      })
      .catch((err) => alert(err));
  };

  const deleteCategory = async (id: number) => {
    api
      .delete(`/base/categories/delete/${id}/`)
      .then((res: any) => {
        if (res.status === 204) {
          const index = categories.findIndex((category) => category.id === id);
          if (index !== -1) {
            const updatedCategories = [...categories];
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories);
          }
        }
      })
      .catch((err) => alert(err));
  };

  const updateCategory = async (categoryToUpdate: categoryIF) => {
    api
      .put(`/base/categories/update/${categoryToUpdate.id}/`, {
        name: categoryToUpdate.name,
        color: categoryToUpdate.color,
      })
      .then((res: any) => {
        if (res.status === 200) {
          const updatedCategories = categories.map((category) =>
            category.id === categoryToUpdate.id ? categoryToUpdate : category
          );

          setCategories(updatedCategories);
        }
      });
  };

  const [currentCategoryID, setCurrentCategoryID] = useState<number | null>(
    null
  );
  const currentCategory: categoryIF | undefined = useMemo(
    () => categories.find((category) => category.id === currentCategoryID),
    [currentCategoryID, categories]
  );

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    getCategories,
    currentCategory,
    currentCategoryID,
    setCurrentCategoryID,
    updateCategory,
    deleteCategory,
    createCategory,
  };
};

export default useCategory;
