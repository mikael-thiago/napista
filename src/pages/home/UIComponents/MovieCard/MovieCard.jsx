import React, { useRef, useState } from "react";

//Functions
import { favoriteMovie, unfavoriteMovie } from "../../../../api-calls/api-calls";

//Components
import { Link } from "react-router-dom";

//Styles
import "./moviecard.css";

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });

}


const MovieCard = ({ movie, imageBaseUrl }) => {

    const favoriteButtonRef = useRef();
    const cardBackgroundRef = useRef();

    const [favorite, setFavorite] = useState(movie.favorite);

    const posterUrl = movie.poster_path ? imageBaseUrl + "w500/" + movie.poster_path : "";

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

    const brightOnHover = () => {
        cardBackgroundRef.current.style.filter = "brightness(.65)";
    }

    const unbrightOnLeave = () => {
        cardBackgroundRef.current.style.filter = "";
    }

    return (
        <div className="movie-card" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnLeave}>
            <Link to={"/movie/" + movie.id} className="movie-card-content" onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton}>
                <div className="movie-card-background" ref={cardBackgroundRef}>
                    <img src={posterUrl} alt="" />
                </div>
                <div className="movie-card-text-wrapper">
                    <div className="movie-card-text">
                        {movie.title}
                    </div>

                </div>
            </Link>

            <button style={{ display: (detectMob() ? "flex" : "none") }} className={"favorite-movie-button " + (favorite ? "unfavorite" : "favorite")} onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} onClick={favorite ? handleUnfavoriteMovie : handleFavoriteMovie} ref={favoriteButtonRef}>
                <span className={"favorite-movie-icon " + (favorite ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-heart")}></span>
            </button>

        </div>
    )
}

export default MovieCard;