const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const moviesRouter = require("./src/routes/movies");
const searchRouter = require("./src/routes/search");

const app = express();

app.use(cors());

app.use("/movie", moviesRouter);
app.use("/search", searchRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

async function main() {
    await app.listen(4000);

    console.log("NodeJS running on PORT " + 4000);
}

main();