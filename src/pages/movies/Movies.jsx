import React, { useEffect, useState } from "react";
import "./Movies.css";
import { getAllMovies, getGenres } from "../../services/dataService";
import { MovieCard } from "../../components";

const Movies = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState(new Map());
  const getMovies = async () => {
    try {
      const res = await getAllMovies();
      setData(res.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllGenres = async () => {
    const genreMap = new Map();
    try {
      const res = await getGenres();
      console.log(res.data.genres);
      res.data.genres.forEach((genre) => genreMap.set(genre.id, genre.name));
      setGenres(genreMap);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMovies();
    getAllGenres();
  }, []);
  return (
    <div id="movies">
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
};

export default Movies;
