import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { getMovieDetails } from "../../services/dataService";
import { useParams } from "react-router-dom";
import config from "../../config";
import useTimeConverter from "../../hooks/useTimeConverter";
import {
  addFavourites,
  addWatchlist,
  getFavourites,
  getWatchlist,
} from "../../services/userService";
import useRevenueConverter from "../../hooks/useRevenueConverter";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [favourites, setFavourites] = useState(false);
  const [watchlist, setWatchList] = useState(false);
  const { id } = useParams();
  // console.log(id);
  const getMovieDetail = async () => {
    const res = await getMovieDetails(id);
    setMovie(res.data);
    console.log(res.data);
  };

  const getAllFavourites = async () => {
    const res = await getFavourites();
    // console.log(res.data.results);
    const favouriteMovie = res.data.results.findIndex(
      (item) => item.original_title === movie?.original_title
    );
    setFavourites(favouriteMovie !== -1 ? true : false);
    console.log(favouriteMovie);
  };

  const getAllWatchlist = async () => {
    const res = await getWatchlist();
    // console.log(res.data.results);
    const watchlistMovie = res.data.results.findIndex(
      (item) => item.original_title === movie?.original_title
    );
    setWatchList(watchlistMovie !== -1 ? true : false);
    console.log(watchlistMovie);
  };

  const fallbackImageUrl =
    "https://image.tmdb.org/t/p/w500/yBZeccMJ1N9AYYzVRZayMxJla20.jpg";

  const handleImageError = (event) => {
    event.target.src = fallbackImageUrl;
  };

  const addToFavourties = async () => {
    const data = {
      media_type: "movie",
      media_id: id,
      favorite: true,
    };
    await addFavourites(data);
    getAllFavourites();
  };

  const removeFromFavourites = async () => {
    const data = {
      media_type: "movie",
      media_id: id,
      favorite: false,
    };
    await addFavourites(data);
    getAllFavourites();
  };

  const addToWatchlist = async () => {
    const data = {
      media_type: "movie",
      media_id: id,
      watchlist: true,
    };
    await addWatchlist(data);
    getAllWatchlist();
  };

  const removeFromWatchlist = async () => {
    const data = {
      media_type: "movie",
      media_id: id,
      watchlist: false,
    };
    await addWatchlist(data);
    getAllWatchlist();
  };

  useEffect(() => {
    getMovieDetail();
    getAllFavourites();
    getAllWatchlist();
  }, []);

  return (
    <div
      id="movie-details"
      style={{
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${config.img_url}${movie?.backdrop_path})`,
      }}
    >
      <div className="card">
        ❝{movie?.tagline}❞
        <div className="card-left">
          <img
            src={`${config.img_url}${movie?.poster_path}`}
            alt="img"
            className="card-image"
            onError={handleImageError}
          />
          <div className="grid-container">
            <span>Status: {movie?.status}</span> |{" "}
            <span>
              <i class="fa-regular fa-clock"></i>
              {useTimeConverter(movie?.runtime)}
            </span>
          </div>
        </div>
        <div className="card-right">
          <div className="card-title">
            <h1>{movie?.original_title}</h1>
          </div>
          <div className="card-body">
            <p>{movie?.overview}</p>
            <div className="card-body2">
              <span>Revenue: ${useRevenueConverter(movie?.revenue)}</span>
              <span>Release Date: {movie?.release_date}</span>
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button
                className={favourites ? "remove-favourites" : "add-favourites"}
                onClick={favourites ? removeFromFavourites : addToFavourties}
              >
                <i class="fa-solid fa-heart"></i>
                {favourites ? "Remove Favourites" : "Add To Favourites"}
              </button>
              <button
                className={watchlist ? "remove-favourites" : "add-favourites"}
                onClick={watchlist ? removeFromWatchlist : addToWatchlist}
              >
                <i class="fa-solid fa-bookmark"></i>
                {watchlist ? "Remove Watchlist" : "Add To Watchlist"}
              </button>
            </div>
            <div className="rating"></div>
            <div className="company-logo">
              <h3 style={{ fontSize: "clamp(2rem,2vw, 3rem)" }}>Poduction</h3>
              <div className="company-group">
                {movie &&
                  movie.production_companies.map((company) => (
                    <img
                      src={`${config.img_url}/${company.logo_path}`}
                      alt=""
                      srcset=""
                      width={50}
                      className="company-logo_img"
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="tag-group">
            <h3>Tags:</h3>
            {movie &&
              movie.genres.map((item) => (
                <div className="tags" key={item.id}>
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
