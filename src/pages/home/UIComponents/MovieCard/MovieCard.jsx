import React, { useRef } from "react";
import "./moviecard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, imageBaseUrl }) => {

    const favoriteButtonRef = useRef();

    const posterUrl = movie.poster_path ? imageBaseUrl + "w342/" + movie.poster_path : "";

    const showFavoriteButton = () => {
        favoriteButtonRef.current.style.display = "flex";
    }

    const hideFavoriteButton = () => {
        favoriteButtonRef.current.style.display = "";
    }

    const favoriteMovie = () => {
        console.log("FAVORITEI!!");
    }

    return (
        <div className="movie-card">
            <Link className="movie-link" to={"/movie/" + movie.id} onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} style={{ textDecoration: "none" }}>
                <div className="movie-poster">
                    <img src={posterUrl} alt="" />
                </div>
                <div className="movie-title-card">
                    {movie.title}
                </div>
            </Link>
            <button className="favorite-movie-button" onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} onClick={favoriteMovie} ref={favoriteButtonRef}>
                <span className="favorite-movie-icon glyphicon glyphicon-heart"></span>
            </button>
        </div>
    )
}

export default MovieCard;