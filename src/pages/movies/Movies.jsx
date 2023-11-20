import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import {
  getAllMovies,
  getGenres,
  searchMovies,
} from "../../services/dataService";
import { MovieCard } from "../../components";

const Movies = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState(new Map());
  const location = useLocation();
  const getMovies = async () => {
    try {
      const res = await getAllMovies();
      setData(res.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSearchResults = async () => {
    try {
      const res = await searchMovies(location.state);
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
    if (location.pathname.includes("movies")) {
      getMovies();
      getAllGenres();
    } else {
      getSearchResults();
      getAllGenres();
    }
  }, [location.state]);
  return (
    <div id="movies">
      {!location.pathname.includes("/movies") && !location.state ? (
        <div>No search Result</div>
      ) : (
        data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))
      )}
    </div>
  );
};

export default Movies;
