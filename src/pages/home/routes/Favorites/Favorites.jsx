import React, { useState, useEffect, useRef } from "react";
import { getFavoritedMovies, unfavoriteMovie } from "../../../../api-calls/api-calls";
import Section from "../../UIComponents/Section/Section";
import { getImageBaseUrl } from "../../../../services/api_config";
import { Link } from "react-router-dom";

import "./favorites.css";

const FavoriteMovieCard = ({ movie, imageBaseUrl, unfavoriteFunction }) => {

    const unfavoriteButtonRef = useRef();

    const posterUrl = movie.poster_path ? imageBaseUrl + "w342/" + movie.poster_path : "";

    const showUnfavoriteButton = () => {
        unfavoriteButtonRef.current.style.display = "flex";
    }

    const hideUnfavoriteButton = () => {
        unfavoriteButtonRef.current.style.display = "";
    }

    return (
        <div className="movie-card">
            <Link className="movie-link" to={"/movie/" + movie.id} onMouseEnter={showUnfavoriteButton} onMouseLeave={hideUnfavoriteButton} style={{ textDecoration: "none" }}>
                <div className="movie-poster">
                    <img src={posterUrl} alt="" />
                </div>
                <div className="movie-title-card">
                    {movie.title}
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