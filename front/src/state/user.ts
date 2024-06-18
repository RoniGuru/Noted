import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { UserIF } from '../utils/interfaces';
const initialState: UserIF = {
  id: null,
  username: '',
  password: '',
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const response = await api.get<UserIF>('base/user/');
    return response.data; // Return the user data on successful request
  } catch (err) {
    console.error('Error fetching user:', err); // Log the error for debugging purposes
    throw err; // Rethrow the error so that createAsyncThunk can handle it
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: UserIF) => {
    try {
      await api.put<UserIF>('base/user/update/', {
        username: user.username,
        password: user.password,
      });
      return user;
    } catch (err) {
      console.error('Error updating user:', err); // Log the error for debugging purposes
      throw err; // Rethrow the error so that createAsyncThunk can handle it
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number) => {
    try {
      await api.delete(`base/user/delete/${id}/`);
      return { id: 0, username: '', password: '' };
    } catch (err) {
      console.error('Error deleting user:', err); // Log the error for debugging purposes
      throw err; // Rethrow the error so that createAsyncThunk can handle it
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserIF>) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.password = '';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserIF>) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.password = '';
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<UserIF>) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.password = action.payload.password;
      });
  },
});

export default userSlice.reducer;
