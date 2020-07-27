import React, { useRef, useState } from "react";

//Functions
import { favoriteMovie, unfavoriteMovie } from "../../../../api-calls/api-calls";

//Components
import { Link } from "react-router-dom";

//Styles
import "./moviecard.css";


const MovieCard = ({ movie, imageBaseUrl }) => {

    const favoriteButtonRef = useRef();

    const [favorite, setFavorite] = useState(movie.favorite);

    const posterUrl = movie.poster_path ? imageBaseUrl + "w342/" + movie.poster_path : "";

    const showFavoriteButton = () => {
        favoriteButtonRef.current.style.display = "flex";
    }

    const hideFavoriteButton = () => {
        favoriteButtonRef.current.style.display = "";
    }

    const handleFavoriteMovie = () => {
        favoriteMovie(movie.id).then((response) => {
            setFavorite(true);
        });
    }

    const handleUnfavoriteMovie = () => {
        unfavoriteMovie(movie.id).then((response) => {
            setFavorite(false);
        });
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
            <button className={"favorite-movie-button " + (favorite ? "unfavorite" : "favorite")} onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} onClick={favorite ? handleUnfavoriteMovie : handleFavoriteMovie} ref={favoriteButtonRef}>
                <span className={"favorite-movie-icon " + (favorite ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-heart")}></span>
            </button>
        </div>
    )
}

export default MovieCard;