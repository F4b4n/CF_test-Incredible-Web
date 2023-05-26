import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app/index.js';
import moviesReducer from './moviesSlice.js';

export const store = configureStore({
  reducer: {
    app: appReducer,
    movies: moviesReducer,
  },
});

export default store;
