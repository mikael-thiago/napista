import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const getMostPopularMovies = async (api_key, page) => {

    const URL = BASE_URL + "movie/popular?api_key=" + api_key + "&page=" + page + "&language=pt";

    const result = (await axios.get(URL));

    return result.data.results;
}

const getConfiguration = async (api_key) => {
    const URL = BASE_URL + "configuration?api_key=" + api_key;

    const result = (await axios.get(URL));
    return result.data;
}

const getMovie = async (api_key, movie_id) => {
    const MOVIE_URL = BASE_URL + "movie/" + movie_id + "?api_key=" + api_key + "&language=pt";

    let movieResult = (await axios.get(MOVIE_URL));

    const CREDITS_URL = BASE_URL + "movie/" + movie_id + "/credits?api_key=" + api_key + "&language=pt"

    let creditsResult = (await axios.get(CREDITS_URL));

    movieResult.data.cast = creditsResult.data.cast;

    return movieResult.data;
}

const getSearchResult = async (api_key, query, page) => {
    const SEARCH_URL = BASE_URL + "search/movie?api_key=" + api_key + "&language=pt&query=" + query + "&page=" + page;

    let searchResult = (await axios.get(SEARCH_URL));

    return searchResult.data;
}


export { getMostPopularMovies, getConfiguration, getMovie, getSearchResult };