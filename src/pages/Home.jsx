import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../components/home/Filter";
import MovieList from "../components/home/MovieList";
import useFetchMovies from "../hooks/useFetchMovies";
import "/src/UI/filter.css";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

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

  useEffect(() => {
    // Read filter values from URL when component mounts
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("name")) {
      setNameFilter(searchParams.get("name"));
    }
    if (searchParams.has("year")) {
      setYearFilter(searchParams.get("year").split(","));
    }
    if (searchParams.has("rating")) {
      setRatingFilter(searchParams.get("rating").split(","));
    }
    if (searchParams.has("genre")) {
      setGenreFilter(searchParams.get("genre").split(","));
    }
  }, [location.search]);

  useEffect(() => {
    if (
      nameFilter ||
      yearFilter.length > 0 ||
      ratingFilter.length > 0 ||
      genreFilter.length > 0
    ) {
      setFiltersApplied(true);
    } else {
      setFiltersApplied(false);
    }
  }, [nameFilter, yearFilter, ratingFilter, genreFilter]);

  useEffect(() => {
    // Update URL with current search query
    const searchParams = new URLSearchParams();
    if (nameFilter) {
      searchParams.set("name", nameFilter);
    }
    if (yearFilter.length > 0) {
      searchParams.set("year", yearFilter.join(","));
    }
    if (ratingFilter.length > 0) {
      searchParams.set("rating", ratingFilter.join(","));
    }
    if (genreFilter.length > 0) {
      searchParams.set("genre", genreFilter.join(","));
    }
    navigate({ search: searchParams.toString() });
  }, [navigate, nameFilter, yearFilter, ratingFilter, genreFilter]);

  useEffect(() => {
    // Extract unique values for year, rating and genre filters
    const newAvailableYears = [
      ...new Set(movies.map((movie) => movie.Year)),
    ].sort((a, b) => b - a);
    const newAvailableRatings = [
      ...new Set(movies.map((movie) => Math.floor(movie.imdbRating))),
    ].sort((a, b) => b - a);
    const newAvailableGenres = [
      ...new Set(
        movies.flatMap((movie) =>
          movie.genre.split(", ").map((genre) => genre.trim())
        )
      ),
    ].sort();

    // Only update state if values have changed
    if (JSON.stringify(newAvailableYears) !== JSON.stringify(availableYears)) {
      setAvailableYears(newAvailableYears);
    }
    if (
      JSON.stringify(newAvailableRatings) !== JSON.stringify(availableRatings)
    ) {
      setAvailableRatings(newAvailableRatings);
    }
    if (
      JSON.stringify(newAvailableGenres) !== JSON.stringify(availableGenres)
    ) {
      setAvailableGenres(newAvailableGenres);
    }
  }, [movies]);

  // Helper function to add or remove a value from a filter array
  const toggleFilterValue = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  return (
    <>
      <h1>Home</h1>
      {loading ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          <h2>Top Rated Movies</h2>
          <MovieList movies={topRatedMovies} />
          <div className="filter">
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Name"
            />
            <Filter
              filterName="Year"
              filterOptions={availableYears}
              selectedOptions={yearFilter}
              onToggleOption={(year) =>
                toggleFilterValue(yearFilter, setYearFilter, year)
              }
            />
            <Filter
              filterName="IMDB Rating"
              filterOptions={availableRatings}
              selectedOptions={ratingFilter}
              onToggleOption={(rating) =>
                toggleFilterValue(ratingFilter, setRatingFilter, rating)
              }
            />
            <Filter
              filterName="Genre"
              filterOptions={availableGenres}
              selectedOptions={genreFilter}
              onToggleOption={(genre) =>
                toggleFilterValue(genreFilter, setGenreFilter, genre)
              }
            />
            {filtersApplied && <MovieList movies={movies} />}
          </div>
        </>
      )}
    </>
  );
}
