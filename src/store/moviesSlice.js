import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  loading: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovies, setLoading } = moviesSlice.actions;

export default moviesSlice.reducer;
