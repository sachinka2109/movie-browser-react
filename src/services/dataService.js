import axios from 'axios';
import config from '../config';

const options = {
    headers: {
        accept: "application/json",
        Authorization:
            `Bearer ${config.token}`,
    },
};


// API For Discover
export const getAllMovies = () => {
    const response = axios.get(`${config.base_url}/discover/movie`, options);
    return response;
}

// For genres
export const getGenres = () => {
    const response = axios.get(`${config.base_url}/genre/movie/list`, options);
    return response;
}

//For MovieLists
export const getMovieLists = (filter) => {
    const response = axios.get(`${config.base_url}/movie/${filter}`, options);
    return response;
}