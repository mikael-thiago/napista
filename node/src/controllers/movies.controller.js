var request = require('request');
var querystring = require("querystring");
var util = require("util");

const createConnection = require("../database/connect.js");

const API_CONFIG = require("../api_config/api_config");

const API_BASE_URL = API_CONFIG.API_BASE_URL;
const API_KEY = API_CONFIG.API_KEY;

const getFavoritedMovies = async (req, res) => {

    const language = req.query.language;
    let favoritedMovies = [];

    const connection = createConnection();

    try {
        const results = await connection.query("SELECT * FROM favoritos");

        for (let i = 0; i < results.length; i++) {

            let favoritedMovie;

            const URL = API_BASE_URL + "movie/" + results[i].movie_id + "?";

            const requestPromise = util.promisify(request);

            favoritedMovie = await requestPromise(URL + querystring.stringify({
                api_key: API_KEY,
                language: language
            }), { json: true });

            favoritedMovie.body.favorite = true;
            favoritedMovies.push(favoritedMovie.body);

        }

        res.status(200).send(favoritedMovies);

    } catch (err) {
        res.status(400).send({ message: "Erro na execução da query do banco de dados" });
    } finally {
        await connection.close();
    }

}

const getMostPopularMovies = async (req, res) => {

    let result = {};

    const page = req.query.page;
    const language = req.query.language;

    const requestPromise = util.promisify(request);

    const URL = API_BASE_URL + "movie/popular?";

    const moviesResponse = await requestPromise(URL + querystring.stringify({
        api_key: API_KEY,
        page: page,
        language: language
    }), { json: true });

    result = moviesResponse.body;

    const connection = createConnection();

    try {

        let query = "SELECT * FROM favoritos";

        const queryResults = await connection.query(query);

        for (var i = 0; i < result.results.length; i++) {
            for (var j = 0; j < queryResults.length; j++) {
                if (result.results[i].id === queryResults[j].movie_id) {
                    result.results[i].favorite = true;
                    break;
                }
                else
                    result.results[i].favorite = false;
            }
        }

        res.status(200).send(result);

    } catch (err) {
        res.status(400).send({ message: "Erro na execução na query do banco de dados" });
    } finally {
        connection.close();
    }

}


const getMovie = async (req, res) => {

    let result = {};

    const movie_id = req.params.movie_id;
    const language = req.query.language;

    const MOVIES_URL = API_BASE_URL + "movie/" + movie_id + "?";

    const requestPromise = util.promisify(request);

    const movieReponse = await requestPromise(MOVIES_URL + querystring.stringify({
        api_key: API_KEY,
        language: language,
        append_to_response: "videos,credits"
    }), { json: true });

    result = movieReponse.body;

    result.cast = result.credits.cast;
    result.videos = result.videos.results;

    result.credits = undefined;
    result.videos.results = undefined;

    const connection = createConnection();

    try {

        let query = "SELECT * FROM favoritos WHERE movie_id=" + result.id;

        const queryResult = await connection.query(query);

        if (queryResult.length === 0)
            result.favorite = false;
        else
            result.favorite = true;

        res.status(200).send(result);

    } catch (err) {
        res.status(400).send({ message: "Erro na execução da query do banco de dados" });
    } finally {
        connection.close();
    }

}

const favoriteMovie = async (req, res) => {

    const movie_id = req.params.movie_id;

    const connection = createConnection();

    try {
        let query = "INSERT INTO favoritos VALUES(" + movie_id + ")";

        await connection.query(query);

        res.status(201).send({ message: "Filme favoritado com sucesso" });

    } catch (err) {
        res.status(409).send({ message: "Filme já está favoritado" });
    } finally {
        connection.close();
    }

}

const unfavoriteMovie = async (req, res) => {

    const movie_id = req.params.movie_id;

    const connection = createConnection();

    try {
        let query = "DELETE FROM favoritos WHERE movie_id=" + movie_id;

        await connection.query(query);

        res.status(201).send({ message: "Filme favoritado com sucesso" });

    } catch (err) {
        res.status(409).send({ message: "Filme já está favoritado" });
    } finally {
        connection.close();
    }

}

module.exports = {
    getMostPopularMovies,
    getMovie,
    favoriteMovie,
    unfavoriteMovie,
    getFavoritedMovies
}