import React, { useState, useEffect, useRef } from "react";

//Functions
import { getImageBaseUrl } from "../../../../api_config";
import { getFavoritedMovies, unfavoriteMovie } from "../../../../api-calls/api-calls";

//Components
import { Link } from "react-router-dom";
import Section from "../../components/Section/Section";

//Styles
import "./favorites.css";
import Loader from "../../Widgets/Loader/Loader";

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

    const wrapperRef = useRef();

    useEffect(() => {
        getFavoritedMovies().then((favoritedMovies) => {
            setMovieData(favoritedMovies);

            removeLoadingEffect();
        })

    }, []);

    const addLoadingEffect = () => {
        let loader = document.getElementsByClassName("loader")[0];

        loader.style.zIndex = 5;
        loader.style.display = "block";

        wrapperRef.current.style.filter = "brightness(.5)";

    }

    const removeLoadingEffect = () => {
        let loader = document.getElementsByClassName("loader")[0];

        wrapperRef.current.style.filter = "";

        loader.style.zIndex = 0;
        loader.style.display = "none";
    }

    const handleUnfavoriteMovie = (movie_id) => {

        addLoadingEffect();

        unfavoriteMovie(movie_id);
        getFavoritedMovies().then((favoritedMovies) => {
            removeLoadingEffect();

            setMovieData(favoritedMovies);
        })
    }

    return (
        movieData ? (
            <>
                <Loader />
                <div ref={wrapperRef} className="favorites-wrapper" >
                    <Section>
                        {movieData.map((movie, index) => (
                            <FavoriteMovieCard unfavoriteFunction={handleUnfavoriteMovie} key={index} movie={movie} imageBaseUrl={getImageBaseUrl()} />
                        )
                        )}
                    </Section>

                </div >
            </>
        ) : <Loader />
    )
}

export default FavoritesPage;