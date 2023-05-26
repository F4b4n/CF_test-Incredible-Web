import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/UI/grid.css';
import '/src/UI/card.css';

function MovieList({ movies }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className='grid'>
      {movies.map((movie) => (
        <div className='card' key={movie.imdbID} onClick={() => handleClick(movie.imdbID)}>
          <h2>{movie.Title}</h2>
          <p>Rating: {movie.imdbRating}</p>
          <p>Year: {movie.Year}</p>
          <p>Categories: {movie.genre}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
