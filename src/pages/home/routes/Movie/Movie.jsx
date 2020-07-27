import React, { useEffect, useState } from "react";
import "./movie.css";
import { withRouter } from "react-router-dom";
import { getMovie } from "../../../../api-calls/api-calls";
import { getAPIkey, getImageBaseUrl } from "../../../../services/api_config";
import "./movie.css";
import CastItem from "./components/CastItem/CastItem";
import Carousel from "../../UIComponents/Carousel/Carousel";

const parseDuratinTime = (min) => {
    let hours = parseInt(min / 60), minutes = min % 60;

    return { hours: hours, minutes: (minutes < 10) ? "0" + minutes : minutes };

}

const Movie = ({ match }) => {
    const movie_id = match.params.id;

    const imageBaseUrl = getImageBaseUrl();

    const [movieData, setMovieData] = useState({
        backdrop_path: "",
        genres: [],
        release_date: "",
        cast: [],
        runtime: 0
    });

    const durationTime = parseDuratinTime(movieData.runtime);

    useEffect(() => {
        getMovie(movie_id).then((movie) => {
            console.log(movie);
            setMovieData(movie);
        })
    }, []);

    return (
        <>
            <div className="movie-banner" style={{ backgroundImage: "url('" + imageBaseUrl.substr(0, (imageBaseUrl.length - 1)) + "/original" + (movieData.backdrop_path || movieData.poster_path) + "')" }}>

            </div>

            <div className="movie-wrapper">

                <div className="movie-info-banner">

                    <div className="movie-info">
                        <div className="movie-title">
                            {movieData.title}
                        </div>
                        <div className="movie-tagline">
                            {movieData.tagline}
                        </div>
                        <div className="movie-genres-release">

                            <div className="movie-genres">
                                {"Gêneros:" + movieData.genres.map((genre, index) => ((index === movieData.genres.length - 1) ? " " + genre.name : " " + genre.name))
                                }
                            </div>

                            <div className="separator"> • </div>

                            <div className="movie-duration">
                                {(durationTime.hours > 0 ? durationTime.hours + "h" : "") + durationTime.minutes + "min"}
                            </div>

                            <div className="separator"> • </div>

                            <div className="movie-release">
                                {movieData.release_date.split("-").reverse().map((datePart, index) => (
                                    (index === movieData.release_date.split("-").length - 1) ? datePart : datePart + "/"
                                ))}
                            </div>

                        </div>
                        <div className="movie-description">
                            {movieData.overview}
                        </div>
                        <div className="movie-rating">
                            <div className="movie-rating-container">
                                <span className="glyphicon glyphicon-star movie-rating-icon">
                                </span>
                                <div className="movie-rating-text">
                                    {movieData.vote_average + "/10"}
                                </div>
                            </div>
                            <div className="movie-rating-container">
                                <div className="movie-rating-vote-count">
                                    {"Votos: " + movieData.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="movie-info-body">

                    <Carousel >
                        {movieData.cast.map((cast_p, index) => (
                            <CastItem cast={cast_p} key={index} />
                        ))}
                    </Carousel>

                    <div class="spacer" style={{ height: "50px", minHeight: "50px" }}>

                    </div>
                </div>


            </div>
        </>
    )
}

export default withRouter(Movie);