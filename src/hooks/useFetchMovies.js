import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setLoading } from '../store/moviesSlice';

function useFetchMovies({ nameFilter, yearFilter, ratingFilter, genreFilter }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      const apiKey = "197996d5";
      let allMovies = [];
      for (let i = 1; i <= 5; i++) {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=love&page=${i}&type=movie`
        );
        const data = await response.json();
        allMovies = [...allMovies, ...data.Search];
      }

      // Fetch additional details for each movie to get the genre and rating information
      let moviesWithDetails = await Promise.all(
        allMovies.map(async (movie) => {
          const basicDetailsResponse = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
          );
          const basicDetailsData = await basicDetailsResponse.json();

          const fullDetailsResponse = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
          );
          const fullDetailsData = await fullDetailsResponse.json();

          return {
            ...movie,
            genre: basicDetailsData.Genre,
            imdbRating: fullDetailsData.imdbRating,
            description: fullDetailsData.Plot,
          };
        })
      );

      dispatch(setMovies(moviesWithDetails || []));
      dispatch(setLoading(false));
    };

    // Only fetch data from API on initial load
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [dispatch, movies.length]);

  // Filter movies based on user input
  let filteredMovies = movies;

  // Filter movies based on name
  if (nameFilter) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  // Filter movies based on year
  if (yearFilter.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      yearFilter.includes(movie.Year)
    );
  }

  // Filter movies based on rating
  if (ratingFilter.length > 0) {
    const minRating = Math.min(...ratingFilter);
    const maxRating = Math.max(...ratingFilter);
    filteredMovies = filteredMovies.filter(
    (movie) => movie.imdbRating >= minRating && movie.imdbRating < maxRating + 1
    );
   }
   

  // Filter movies based on genre
  if (genreFilter.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      genreFilter.some((genre) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      )
    );
  }

  // Get top-rated movies
  let topRatedMovies = [...movies];
  topRatedMovies.sort((a, b) => b.imdbRating - a.imdbRating);
  topRatedMovies = topRatedMovies.slice(0, 8);

  return { movies: filteredMovies, loading, topRatedMovies };
}

export default useFetchMovies;
