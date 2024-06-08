import { useState, useEffect, useMemo } from 'react';
import { categoryIF } from '../utils/interfaces';
import api from '../api';

const useCategory = () => {
  const [categories, SetCategories] = useState<categoryIF[]>([]);

  const getCategories = async () => {
    api.get('/base/categories/').then((response) => {
      SetCategories(response.data);
    });
  };

  const deleteCategory = async (id: number) => {
    api
      .delete(`/base/categories/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getCategories();
        }
      })
      .catch((err) => alert(err));
  };

  const updateCategory = async (categoryToUpdate: categoryIF) => {
    api.put(`/base/categories/update/${categoryToUpdate.id}/`, {
      name: categoryToUpdate.name,
      color: categoryToUpdate.color,
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
  };
};

export default useCategory;
