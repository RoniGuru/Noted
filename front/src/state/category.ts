import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import Category from '../components/Category/Category';

interface Category {
  id: number;
  name: string;
  color: string;
}

const initialState: Category[] = [];

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    try {
      const response = await api.get<Category[]>('/base/categories/');
      return response.data;
    } catch (err) {
      console.error('Error getting categories:', err);
      throw err;
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category: Category) => {
    try {
      const response = await api.post<Category>('/base/categories/', {
        name: category.name,
        color: category.color,
      });
      return response.data;
    } catch (err) {
      console.error('Error creating category:', err);
      throw err;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (category: Category) => {
    try {
      await api.delete(`/base/categories/delete/${category.id}/`);
      return category;
    } catch (err) {
      console.error('Error deleting category:', err);
      throw err;
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (category: Category) => {
    try {
      const response = await api.put<Category>(
        `/base/categories/update/${category.id}/`,
        category
      );
      return response.data;
    } catch (err) {
      console.error('Error updating category:', err);
      throw err;
    }
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.push(action.payload);
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state.splice(index, 1);
          }
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state[index] = action.payload;
          }
        }
      );
  },
});

export default categorySlice.reducer;
