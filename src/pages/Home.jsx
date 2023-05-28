//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../components/home/Filters";
import MovieList from "../components/home/MovieList";
import useFetchMovies from "../hooks/useFetchMovies";
import useFilters from "../hooks/useFilters";
import useAvailableFilterOptions from "../hooks/useAvailableFilterOptions"; // Import useAvailableFilterOptions hook


export default function Home() {
  const navigate = useNavigate();

  // Use custom hook to manage filter state
  const {
    nameFilter,
    setNameFilter,
    yearFilter,
    setYearFilter,
    ratingFilter,
    setRatingFilter,
    genreFilter,
    setGenreFilter,
    filtersApplied,
  } = useFilters(navigate);

  // Use custom hook to fetch data from API
  const { movies, loading, topRatedMovies } = useFetchMovies(
    {
      nameFilter,
      yearFilter,
      ratingFilter,
      genreFilter,
    },
    []
  );

  // Use custom hook to extract unique values for year, rating and genre filters
  const {
    availableYears,
    availableRatings,
    availableGenres,
  } = useAvailableFilterOptions(movies);

  return (
    <>
      <h1>Home</h1>
      {loading ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          <h2>Top Rated Movies</h2>
          <MovieList movies={topRatedMovies} />
          <Filters
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            availableYears={availableYears}
            availableRatings={availableRatings}
            availableGenres={availableGenres}
          />
          {filtersApplied && <MovieList movies={movies} />}
        </>
      )}
    </>
  );
}
