import axios from "axios";

const BASE_URL = "http://localhost:4000/";

const getMostPopularMovies = async (page) => {

    const URL = BASE_URL + "movie/popular?page=" + page + "&language=pt";

    const result = (await axios.get(URL));

    return result.data.results;
}

const getMovie = async (movie_id) => {

    const MOVIE_URL = BASE_URL + "movie/" + movie_id + "?language=pt";

    let movieResult = (await axios.get(MOVIE_URL));

    return movieResult.data;
}

const getFavoritedMovies = async () => {
    const FAVORITED_MOVIES_URL = BASE_URL + "movie/favoriteds?language=pt";

    const result = (await axios.get(FAVORITED_MOVIES_URL));

    return result.data;
}

const favoriteMovie = async (movie_id) => {
    const FAVORITE_URL = BASE_URL + "movie/favorite/" + movie_id;

    const result = (await axios.post(FAVORITE_URL));

}

const unfavoriteMovie = async (movie_id) => {
    const UNFAVORITE_URL = BASE_URL + "movie/unfavorite/" + movie_id;

    const result = (await axios.delete(UNFAVORITE_URL));
}

const getSearchResult = async (query, page) => {

    const SEARCH_URL = BASE_URL + "search/movie?query=" + query + "&page=" + page + "&language=pt";

    let searchResult = (await axios.get(SEARCH_URL));

    return searchResult.data;
}

export { getMostPopularMovies, getMovie, favoriteMovie, unfavoriteMovie, getSearchResult, getFavoritedMovies };