import api from '../api';
import { categoryIF, ColorChoice } from '../utils/interfaces';

export const deleteCategory = async (id: number, getCategories: () => void) => {
  api
    .delete(`/base/categories/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        getCategories();
      }
    })
    .catch((err) => alert(err));
};

export const updateCategory = async (updatedCategory: categoryIF) => {
  api.put(`/base/categories/update/${updatedCategory.id}/`, {
    name: updatedCategory.name,
    color: updatedCategory.color,
  });
};
