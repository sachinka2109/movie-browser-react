import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./MovieCard.css";
import config from "../../config";

const MovieCard = ({ movie, genres }) => {
  const genreName = movie.genre_ids.map((genreId) => genres.get(genreId));
  const [rotate, setRotate] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setRotate(true);
  };

  const fallbackImageUrl =
    "https://image.tmdb.org/t/p/w500/yBZeccMJ1N9AYYzVRZayMxJla20.jpg";

  const handleImageError = (event) => {
    event.target.src = fallbackImageUrl;
  };

  useEffect(() => {
    if (rotate) {
      const timeoutId = setTimeout(() => {
        navigate(`/movies/${movie.id}`);
        setRotate(false);
      }, 1000);
      return () => clearInterval(timeoutId);
    }
  }, [rotate]);

  return (
    <>
      <div
        id="card"
        onClick={handleClick}
        className={rotate ? "card-scale" : ""}
      >
        <img
          // src={`${config.img_url}/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg`}
          src={`${config.img_url}${movie.poster_path}`}
          onError={handleImageError}
          alt=""
          className="img-responsive"
        />
        <div className="card-body">
          <h4 className="card-title">{movie.original_title}</h4>
          <p className="card-content">{movie.overview}</p>
          <div className="card-footer-container">
            {genreName.map((genre, i) => (
              <span className="card-footer" key={i}>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
