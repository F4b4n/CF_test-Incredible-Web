import { useState, useEffect } from "react";

export default function useAvailableFilterOptions(movies) {
  const [availableYears, setAvailableYears] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

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

  return { availableYears, availableRatings, availableGenres };
}
