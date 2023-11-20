import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { getMovieDetails } from "../../services/dataService";
import { useParams } from "react-router-dom";
import config from "../../config";
import useTimeConverter from "../../hooks/useTimeConverter";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  // console.log(id);
  const getMovieDetail = async () => {
    const res = await getMovieDetails(id);
    setMovie(res.data);
    console.log(res.data);
  };

  const fallbackImageUrl =
    "https://image.tmdb.org/t/p/w500/yBZeccMJ1N9AYYzVRZayMxJla20.jpg";

  const handleImageError = (event) => {
    event.target.src = fallbackImageUrl;
  };

  useEffect(() => {
    getMovieDetail();
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
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button>
                <i class="fa-solid fa-heart"></i>Add To Favourites
              </button>
              <button>
                <i class="fa-solid fa-bookmark"></i>Add To Watchlist
              </button>
            </div>
            <div className="rating"></div>
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
