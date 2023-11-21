import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import {
  getAllMovies,
  getGenres,
  searchMovies,
} from "../../services/dataService";
import { MovieCard } from "../../components";
import { getFavourites, getWatchlist } from "../../services/userService";

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

  const getAllFavourites = async () => {
    try {
      const res = await getFavourites();
      console.log(res.data.results);
      setData(res.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllWatchlist = async () => {
    try {
      const res = await getWatchlist();
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
    } else if (location.pathname.includes("favourites")) {
      getAllFavourites();
      getAllGenres();
    } else if (location.pathname.includes("watchlist")) {
      getAllWatchlist();
      getAllGenres();
    } else if (location.pathname.includes("search")) {
      getSearchResults();
      getAllGenres();
    }
  }, [location.state, location.pathname]);

  console.log(data);
  return (
    <div id="movies">
      {location.pathname.includes("/search") && !location.state ? (
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
