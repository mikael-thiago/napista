import React, { useState, useEffect, useRef } from "react";

//Functions
import { getImageBaseUrl } from "../../../../services/api_config";
import { getFavoritedMovies, unfavoriteMovie } from "../../../../api-calls/api-calls";

//Components
import { Link } from "react-router-dom";
import Section from "../../UIComponents/Section/Section";

//Styles
import "./favorites.css";
import Loader from "../../UIComponents/Loader/Loader";

const FavoriteMovieCard = ({ movie, imageBaseUrl, unfavoriteFunction }) => {

    const unfavoriteButtonRef = useRef();
    const cardBackgroundRef = useRef();

    const posterUrl = movie.poster_path ? imageBaseUrl + "w342" + movie.poster_path : "";

    const brightOnHover = () => {
        cardBackgroundRef.current.style.filter = "brightness(1)";
    }

    const unbrightOnLeave = () => {
        cardBackgroundRef.current.style.filter = "";
    }

    return (
        <div className="movie-card" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnLeave}>
            <Link to={"/movie/" + movie.id} className="movie-card-content">
                <div className="movie-card-background" ref={cardBackgroundRef} style={{ backgroundImage: "url('" + posterUrl + "')" }}>
                </div>
                <div className="movie-card-text-wrapper">
                    <div className="movie-card-text">
                        {movie.title}
                    </div>

                </div>
            </Link>

            <button className="unfavorite-movie-button" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnLeave} onClick={() => unfavoriteFunction(movie.id)} ref={unfavoriteButtonRef}>
                <span className="unfavorite-movie-icon fa fa-times"></span>
            </button>

        </div>
    );

}

const FavoritesPage = () => {
    const [movieData, setMovieData] = useState(null);


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
        movieData ? (
            <div className="favorites-wrapper" >
                <Section>
                    {movieData.map((movie, index) => (
                        <FavoriteMovieCard unfavoriteFunction={handleUnfavoriteMovie} key={index} movie={movie} imageBaseUrl={getImageBaseUrl()} />
                    )
                    )}
                </Section>

            </div >
        ) : <Loader />
    )
}

export default FavoritesPage;