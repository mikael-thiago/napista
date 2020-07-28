import axios from "axios";
import { getAPIKey, getBaseUrl } from "../services/api_config";

const API_KEY = getAPIKey();
const BASE_URL = getBaseUrl();

//Movies calls
const getMostPopularMovies = async (page) => {

    const URL = BASE_URL + "movie/popular?api_key=" + API_KEY + "&page=" + page + "&language=pt-BR";

    const result = (await axios.get(URL));

    return result.data.results;
}

const getMovie = async (movie_id) => {

    const MOVIE_URL = BASE_URL + "movie/" + movie_id + "?api_key=" + API_KEY + "&language=pt-BR&append_to_response=videos,credits,recommendations";

    let movieResult = (await axios.get(MOVIE_URL));

    movieResult.data.cast = movieResult.data.credits.cast;

    movieResult.data.recommendations = movieResult.data.recommendations.results;

    movieResult.data.videos = movieResult.data.videos.results;

    return movieResult.data;
}

const getFavoritedMovies = async () => {
    let favoritedMovies = [];

    for (var i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);


        if (localStorage.getItem(key) === "true") {
            var favoritedMovie;

            favoritedMovie = await getMovie(key);

            favoritedMovies.push(favoritedMovie);
        }
    }

    return favoritedMovies;
}

const favoriteMovie = (movie_id) => {
    localStorage.setItem(movie_id, true);

}

const unfavoriteMovie = (movie_id) => {

    localStorage.setItem(movie_id, false);
}

const isFavorite = (movie_id) => {
    return (localStorage.getItem(movie_id) === "true");
}

//Search calls
const getSearchResult = async (query, page) => {

    const SEARCH_URL = BASE_URL + "search/movie?api_key=" + API_KEY + "&query=" + query + "&page=" + page + "&language=pt-BR";

    console.log(SEARCH_URL);

    let searchResult = (await axios.get(SEARCH_URL));

    return searchResult.data;
}

export { getMostPopularMovies, getMovie, favoriteMovie, unfavoriteMovie, getSearchResult, getFavoritedMovies, isFavorite };