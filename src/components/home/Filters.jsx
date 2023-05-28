import Filter from "./Filter";
import "/src/UI/filters.css";

export default function Filters({
  nameFilter,
  setNameFilter,
  yearFilter,
  setYearFilter,
  ratingFilter,
  setRatingFilter,
  genreFilter,
  setGenreFilter,
  availableYears,
  availableRatings,
  availableGenres,
}) {
  // Helper function to add or remove a value from a filter array
  const toggleFilterValue = (filterArray, setFilterArray, value) => {
    const filterSet = new Set(filterArray);
    if (filterSet.has(value)) {
      filterSet.delete(value);
    } else {
      filterSet.add(value);
    }
    setFilterArray(Array.from(filterSet));
  };

  return (
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
          toggleFilterValue(ratingFilter, setRatingFilter, String(rating))
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
    </div>
  );
}
