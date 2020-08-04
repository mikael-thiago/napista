import React, { useRef, useState } from "react";

//Functions
import { favoriteMovie, unfavoriteMovie, isFavorite } from "../../../../api-calls/api-calls";

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

    const [favorite, setFavorite] = useState(isFavorite(movie.id));

    const posterUrl = movie.poster_path ? imageBaseUrl + "w500/" + movie.poster_path : "";

    const showFavoriteButton = () => {
        favoriteButtonRef.current.style.display = "flex";
    }

    const hideFavoriteButton = () => {
        if (!detectMob())
            favoriteButtonRef.current.style.display = "";
    }

    const handleFavoriteMovie = () => {
        favoriteMovie(movie.id);

        setFavorite(true);
    }

    const handleUnfavoriteMovie = () => {
        unfavoriteMovie(movie.id);

        setFavorite(false);
    }

    const brightOnHover = () => {
        cardBackgroundRef.current.style.filter = "brightness(1)";
    }

    const unbrightOnLeave = () => {
        cardBackgroundRef.current.style.filter = "";
    }

    return (
        <div className="movie-card" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnLeave}>
            <Link to={"/movie/" + movie.id} className="movie-card-content" onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} style={{ color: (detectMob() ? "white" : "") }}>
                <div className="movie-card-background" ref={cardBackgroundRef} style={{ backgroundImage: "url('" + posterUrl + "')" }}>
                </div>
                <div className="movie-card-text-wrapper">
                    {/*<div className="movie-card-text">
                        {movie.title}
    </div>*/}

                </div>
            </Link>

            <button style={{ display: (detectMob() ? "flex" : "none") }} className={"favorite-movie-button " + (isFavorite(movie.id) ? "unfavorite" : "favorite")} onMouseEnter={showFavoriteButton} onMouseLeave={hideFavoriteButton} onClick={isFavorite(movie.id) ? handleUnfavoriteMovie : handleFavoriteMovie} ref={favoriteButtonRef}>
                <span className={"favorite-movie-icon " + (isFavorite(movie.id) ? "fa fa-minus" : "fa fa-heart")}></span>
            </button>

        </div>
    )
}

export default MovieCard;