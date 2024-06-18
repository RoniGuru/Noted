import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.ts';
import categoryReducer from './category.ts';
import noteReducer from './note.ts';
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
