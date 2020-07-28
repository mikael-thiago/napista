import React, { useEffect, useState } from "react";

//Functions
import { getMostPopularMovies } from "../../../../api-calls/api-calls";
import { getImageBaseUrl } from "../../../../api_config";

//Components
import Section from "../../components/Section/Section";
import MovieCard from "../../components/MovieCard/MovieCard";

//Styles
import "./principal.css";
import Loader from "../../Widgets/Loader/Loader";

const Principal = () => {

    const [movieData, setMovieData] = useState([]);

    const loaded = (movieData.length > 0);

    useEffect(() => {
        getMostPopularMovies(1).then((mostPopularMovies) => {
            setMovieData(mostPopularMovies);
        });
    }, []);

    return (

        loaded ? (
            <>
                <div className="principal-wrapper">
                    <Section title="Filmes mais populares">
                        {movieData.map((movie, index) => (
                            <MovieCard key={index} movie={movie} imageBaseUrl={getImageBaseUrl()} />
                        )
                        )}
                    </Section>

                </div>
            </>
        ) : <Loader />

    )
}

export default Principal;