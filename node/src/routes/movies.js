const express = require("express");

const router = express.Router();

const movies = require("../controllers/movies.controller.js");

router.get("/popular", movies.getMostPopularMovies);
router.get("/favoriteds", movies.getFavoritedMovies);
router.get("/:movie_id", movies.getMovie);

router.post("/favorite/:movie_id", movies.favoriteMovie);
router.delete("/unfavorite/:movie_id", movies.unfavoriteMovie);

module.exports = router;