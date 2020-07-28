import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

//Function
import { getMovie, unfavoriteMovie, favoriteMovie, isFavorite } from "../../../../api-calls/api-calls";
import { getImageBaseUrl } from "../../../../api_config";


//Components
import CastItem from "./components/CastItem/CastItem";
import Carousel from "../../components/Carousel/Carousel";

//Styles
import "./movie.css";
import VideoItem from "./components/VideoItem/VideoItem";
import RecommendationItem from "./components/RecommendationItem/RecommendationItem";
import Loader from "../../Widgets/Loader/Loader";

const parseDuratinTime = (min) => {
    let hours = parseInt(min / 60), minutes = min % 60;

    return { hours: hours, minutes: (minutes < 10) ? "0" + minutes : minutes };

}

const renderTrailersCarousel = (trailers) => {
    return (
        trailers.length !== 0 ? (
            <Carousel itemWidth={250} title="Trailers" >
                {trailers.map((trailer, index) => (
                    <VideoItem key={index} video={trailer} />
                ))}
            </Carousel>
        ) : <></>
    )
}

const renderCastCarousel = (cast) => {

    const itemWidth = window.innerWidth <= 450 ? 70 : (window.innerWidth <= 800 ? 85 : 100);

    return (
        cast.length !== 0 ? (
            <Carousel title="Elenco" itemWidth={itemWidth}>
                {cast.map((cast_p, index) => (
                    <CastItem cast={cast_p} key={index} />
                ))}
            </Carousel>
        ) : <></>
    )
}

const renderRecommendationsCarousel = (recommendations) => {
    return (
        recommendations.length !== 0 ? (
            <Carousel title="Recomendações">
                {recommendations.map((recommendation, index) => (
                    <RecommendationItem key={index} recommendation={recommendation} />
                ))}
            </Carousel>
        ) : <></>
    )
}

const renderSimilarsCarousel = (similars) => {
    return (
        similars.length !== 0 ? (
            <Carousel title="Títulos Similares">
                {similars.map((similar, index) => (
                    <RecommendationItem key={index} recommendation={similar} />
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
        release_date: "",
        budget: "",
        revenue: "",
        popularity: "",
        production_countries: [],
        cast: [],
        videos: [],
        recommendations: [],
        genres: [],
        similar: [],
        runtime: 0,
        loaded: false,
        favorite: false
    });

    const release_date = movieData.release_date || "";

    const back_image_url = movieData.backdrop_path || movieData.poster_path || "";

    const budget = movieData.budget || "";

    const revenue = movieData.revenue || "";

    const favorite = movieData.favorite;

    const mainProductionCountry = movieData.production_countries[0] || "";

    const trailers = movieData.videos.filter((video) => video.type === "Trailer");

    const durationTime = parseDuratinTime(movieData.runtime);

    const similars = (movieData.similar ? movieData.similar.results : []);

    useEffect(() => {
        getMovie(movie_id).then((movie) => {
            movie.loaded = true;
            movie.favorite = isFavorite(movie.id);

            console.log(movie.status);
            setMovieData(movie);

        })
    }, [movie_id]);

    const handleFavoriteMovie = () => {
        favoriteMovie(movieData.id);

        let { ...movie } = movieData;
        movie.favorite = true;

        setMovieData(movie);
    }

    const handleUnfavoriteMovie = () => {
        unfavoriteMovie(movieData.id);

        let { ...movie } = movieData;
        movie.favorite = false;

        setMovieData(movie);
    }

    return (
        movieData.loaded ?
            (<>
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

                            <div className="movie-details">

                                {movieData.genres ? (
                                    <div className="movie-genres">
                                        {"Gêneros:" + movieData.genres.map((genre, index) => ((index === movieData.genres.length - 1) ? " " + genre.name : " " + genre.name))
                                        }
                                    </div>
                                ) : <></>}

                                <div className="separator"> • </div>

                                <div className="movie-duration">
                                    {(durationTime.hours > 0 ? durationTime.hours + "h" : "") + durationTime.minutes + "min"}
                                </div>

                                {release_date ? (
                                    <>
                                        <div className="separator"> • </div>

                                        <div className="movie-release">
                                            {release_date.split("-").reverse().map((datePart, index) => (
                                                (index === release_date.split("-").length - 1) ? datePart : datePart + "/"
                                            ))}
                                        </div>
                                    </>
                                ) : <></>}

                                {movieData.popularity !== "" ? (
                                    <>
                                        <div className="separator"> • </div>

                                        <div className="movie-popularity">
                                            {"Popularidade: " + movieData.popularity}
                                        </div>
                                    </>
                                ) : <></>
                                }

                            </div>

                            <div className="movie-details">
                                {budget !== "" ? (
                                    <>
                                        <div className="movie-budget">
                                            {"Orçamento: " + (mainProductionCountry.iso_3166_1 === "US" ? "U$ " : "R$ ") + budget.toLocaleString("pt-BR")}
                                        </div>
                                    </>
                                ) : <></>}

                                {revenue !== "" ? (
                                    <>
                                        <div className="separator"> • </div>

                                        <div className="movie-revenue">
                                            {"Receita: " + (mainProductionCountry.iso_3166_1 === "US" ? "U$ " : "R$ ") + revenue.toLocaleString("pt-BR")}
                                        </div>
                                    </>
                                ) : <></>}
                            </div>

                            <div className="movie-details">
                                <div className="movie-status">
                                    {"Status: " + (movieData.status === "Planned" ? "Em planejamento" : "Lançado")}
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

                        <button className="favorite-button" onClick={favorite ? handleUnfavoriteMovie : handleFavoriteMovie}>
                            <span className={"fa " + (favorite ? "fa-heart favorited" : "fa fa-heart-o unfavorited")} />
                        </button>

                    </div>

                    <div className="movie-info-body">

                        {renderCastCarousel(movieData.cast)}
                        {renderTrailersCarousel(trailers)}
                        {renderRecommendationsCarousel(movieData.recommendations)}
                        {renderSimilarsCarousel(similars)}

                        <div className="spacer" style={{ height: "50px", minHeight: "50px" }}>

                        </div>
                    </div>


                </div>
            </>) : <Loader />
    )
}

export default withRouter(Movie);