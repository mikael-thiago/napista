const express = require("express");

const router = express.Router();

const search = require("../controllers/search.controller.js");

router.get("/movie", search.getSearchResult);

module.exports = router;