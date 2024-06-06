import api from '../api';
import { categoryIF, ColorChoice } from '../utils/interfaces';
export const getColorChoices = async (
  setColorChoices: React.Dispatch<React.SetStateAction<ColorChoice[]>>
) => {
  api
    .get('/base/color-choices/')
    .then((response) => {
      setColorChoices(response.data);
    })
    .catch((error) => console.error('Error fetching color choices:', error));
};

export const getCategories = async (
  SetCategories: React.Dispatch<React.SetStateAction<categoryIF[]>>
) => {
  api.get('/base/categories/').then((response) => {
    SetCategories(response.data);
  });
};

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
