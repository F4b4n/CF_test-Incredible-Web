import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '/src/UI/moviedetails.css';

export default function MovieDetails() {
  const { id } = useParams();
  const movie = useSelector(state => state.movies.movies.find(movie => movie.imdbID === id));

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className='details'>
      <h1>{movie.Title}</h1>
      <p>Year: {movie.Year}</p>
      <p>Rating: {movie.imdbRating}</p>
      <p>Genre: {movie.genre}</p>
      <p>Description: {movie.description}</p>
      <iframe src="https://www.youtube.com/embed/YE7VzlLtp-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
}
