import React, { useState, useEffect, useRef } from "react";

//Functions
import { getImageBaseUrl } from "../../../../services/api_config";
import { getFavoritedMovies, unfavoriteMovie } from "../../../../api-calls/api-calls";

//Components
import { Link } from "react-router-dom";
import Section from "../../UIComponents/Section/Section";

//Styles
import "./favorites.css";

const FavoriteMovieCard = ({ movie, imageBaseUrl, unfavoriteFunction }) => {

    const unfavoriteButtonRef = useRef();
    const cardBackgroundRef = useRef();

    const posterUrl = movie.poster_path ? imageBaseUrl + "w342" + movie.poster_path : "";

    const showUnfavoriteButton = () => {
        unfavoriteButtonRef.current.style.display = "flex";
    }

    const hideUnfavoriteButton = () => {
        unfavoriteButtonRef.current.style.display = "";
    }

    const brightOnHover = () => {
        cardBackgroundRef.current.style.filter = "brightness(1)";
    }

    const unbrightOnLeave = () => {
        cardBackgroundRef.current.style.filter = "";
    }

    return (
        <div className="movie-card" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnLeave}>
            <Link to={"/movie/" + movie.id} className="movie-card-content" onMouseEnter={showUnfavoriteButton} onMouseLeave={hideUnfavoriteButton}>
                <div className="movie-card-background" ref={cardBackgroundRef} style={{ backgroundImage: "url('" + posterUrl + "')" }}>
                </div>
                <div className="movie-card-text-wrapper">
                    <div className="movie-card-text">
                        {movie.title}
                    </div>

                </div>
            </Link>

            <button className="unfavorite-movie-button" onMouseEnter={showUnfavoriteButton} onClick={() => unfavoriteFunction(movie.id)} onMouseLeave={hideUnfavoriteButton} ref={unfavoriteButtonRef}>
                <span className="unfavorite-movie-icon glyphicon glyphicon-remove"></span>
            </button>

        </div>
    );

}

const FavoritesPage = () => {
    const [movieData, setMovieData] = useState([]);


    useEffect(() => {
        getFavoritedMovies().then((favoritedMovies) => {
            setMovieData(favoritedMovies);
        })
    }, []);

    const handleUnfavoriteMovie = (movie_id) => {
        unfavoriteMovie(movie_id).then((response) => {
            getFavoritedMovies().then((favoritedMovies) => {
                setMovieData(favoritedMovies);
            });
        })
    }

    return (
        <div className="favorites-wrapper">
            <Section>
                {movieData.map((movie, index) => (
                    <FavoriteMovieCard unfavoriteFunction={handleUnfavoriteMovie} key={index} movie={movie} imageBaseUrl={getImageBaseUrl()} />
                )
                )}
            </Section>

        </div>
    )
}

export default FavoritesPage;