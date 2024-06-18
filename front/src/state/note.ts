import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

interface Note {
  id: number;
  title: string;
  body: string;
  category: number | null;
}

const initialState: Note[] = [];

export const getNotes = createAsyncThunk('note/getNote', async () => {
  try {
    const response = await api.get<Note[]>('/base/notes/');
    return response.data;
  } catch (err) {
    console.log('error getting notes ', err);
    throw err;
  }
});

export const createNote = createAsyncThunk(
  'note/createNote',
  async (note: Note) => {
    try {
      const response = await api.post<Note>('/base/notes/', note);
      return response.data;
    } catch (err) {
      console.log('problem creating note ', err);
      throw err;
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (note: Note) => {
    try {
      await api.delete(`/base/notes/delete/${note.id}/`);
      return note;
    } catch (err) {
      console.log('problem deleting note ', err);
      throw err;
    }
  }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (note: Note) => {
    try {
      const response = await api.put<Note>(
        `/base/notes/update/${note.id}/`,
        note
      );
      return response.data;
    } catch (err) {
      console.log('problem updating note ', err);
      throw err;
    }
  }
);

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        return action.payload;
      })
      .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  },
});

export default noteSlice.reducer;
