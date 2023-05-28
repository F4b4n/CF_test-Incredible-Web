import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useFilters(navigate) {
  const location = useLocation();
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

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

  return {
    nameFilter,
    setNameFilter,
    yearFilter,
    setYearFilter,
    ratingFilter,
    setRatingFilter,
    genreFilter,
    setGenreFilter,
    filtersApplied,
  };
}
