import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

//Function
import { getMovie } from "../../../../api-calls/api-calls";
import { getImageBaseUrl } from "../../../../services/api_config";


//Components
import CastItem from "./components/CastItem/CastItem";
import Carousel from "../../UIComponents/Carousel/Carousel";

//Styles
import "./movie.css";
import VideoItem from "./components/VideoItem/VideoItem";

const parseDuratinTime = (min) => {
    let hours = parseInt(min / 60), minutes = min % 60;

    return { hours: hours, minutes: (minutes < 10) ? "0" + minutes : minutes };

}

const renderTrailersCarousel = (trailers) => {
    return (
        trailers !== [] ? (<Carousel title="Trailers" >
            {trailers.map((trailer, index) => (
                <VideoItem key={index} video={trailer} />
            ))}
        </Carousel>) : <></>
    )
}

const renderCastCarousel = (cast) => {

    const itemWidth = window.innerWidth <= 450 ? 70 : (window.innerWidth <= 800 ? 85 : 100);

    return (
        cast !== [] ? (
            <Carousel title="Elenco" itemWidth={itemWidth}>
                {cast.map((cast_p, index) => (
                    <CastItem cast={cast_p} key={index} />
                ))}
            </Carousel>
        ) : <></>
    )
}

const Movie = ({ match }) => {
    const movie_id = match.params.id;

    const imageBaseUrl = getImageBaseUrl();

    const [movieData, setMovieData] = useState({
        backdrop_path: "",
        poster_path: "",
        genres: [],
        release_date: "",
        cast: [],
        videos: [],
        runtime: 0
    });

    const release_date = movieData.release_date || "";
    const back_image_url = movieData.backdrop_path || movieData.poster_path || "";

    const trailers = movieData.videos.filter((video) => video.type === "Trailer");

    const durationTime = parseDuratinTime(movieData.runtime);

    useEffect(() => {
        getMovie(movie_id).then((movie) => {
            setMovieData(movie);
        })
    }, []);

    return (
        <>
            <div className="movie-banner" style={{ backgroundImage: "url('" + imageBaseUrl + "original" + back_image_url + "')" }}>

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
                                {release_date.split("-").reverse().map((datePart, index) => (
                                    (index === release_date.split("-").length - 1) ? datePart : datePart + "/"
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

                    {renderCastCarousel(movieData.cast)}
                    {renderTrailersCarousel(trailers)}

                    <div className="spacer" style={{ height: "50px", minHeight: "50px" }}>

                    </div>
                </div>


            </div>
        </>
    )
}

export default withRouter(Movie);