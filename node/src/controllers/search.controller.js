var request = require('request');
var querystring = require("querystring");

const API_CONFIG = require("../api_config/api_config");

const API_BASE_URL = API_CONFIG.API_BASE_URL;
const API_KEY = API_CONFIG.API_KEY;

const getSearchResult = async (req, res) => {

    const query = req.query.query;
    const page = req.query.page;
    const language = req.query.language;

    const SEARCH_URL = API_BASE_URL + "search/movie?";

    request(SEARCH_URL + querystring.stringify({
        api_key: API_KEY,
        page: page,
        language: language,
        query: query
    }), { json: true }, (error, response, body) => {

        if (error) res.status(400).send({});

        result = body;
        res.status(200).send(result);
    })
}

module.exports = {
    getSearchResult
};