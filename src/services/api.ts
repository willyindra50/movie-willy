import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async (page = 1) => {
  const { data } = await tmdb.get('/trending/movie/week', { params: { page } });
  return data;
};

export const fetchNewReleases = async (page = 1) => {
  const { data } = await tmdb.get('/movie/now_playing', { params: { page } });
  return data;
};

export const fetchMovieDetails = async (movieId: number) => {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits,videos' },
  });
  return data;
};
