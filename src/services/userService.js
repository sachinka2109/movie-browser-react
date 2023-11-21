import axios from "axios";
import config from "../config";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${config.token}`,
  },
};

export const addFavourites = (data) => {
  const response = axios.post(
    `${config.base_url}/account/${config.id}/favorite`,
    data,
    options
  );
  return response;
};

export const getFavourites = () => {
  const response = axios.get(
    `${config.base_url}/account/${config.id}/favorite/movies`,
    options
  );
  return response;
};

export const addWatchlist = (data) => {
  const response = axios.post(
    `${config.base_url}/account/${config.id}/watchlist`,
    data,
    options
  );
  return response;
};

export const getWatchlist = () => {
  const response = axios.get(
    `${config.base_url}/account/${config.id}/watchlist/movies`,
    options
  );
  return response;
};
