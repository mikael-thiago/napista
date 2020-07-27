import React, { useEffect, useState } from "react";
import { getMostPopularMovies } from "../../../../api-calls/api-calls";
import { getAPIkey, getImageBaseUrl } from "../../../../services/api_config";
import Section from "../../UIComponents/Section/Section";
import MovieCard from "../../UIComponents/MovieCard/MovieCard";
import "./principal.css";
const Principal = () => {

    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        getMostPopularMovies(1).then((mostPopularMovies) => {
            setMovieData(mostPopularMovies);
        });
    }, []);

    return (
        <div className="principal-wrapper">
            <Section title="Filmes mais populares">
                {movieData.map((movie, index) => (
                    <MovieCard key={index} movie={movie} imageBaseUrl={getImageBaseUrl()} />
                )
                )}
            </Section>

        </div>
    )
}

export default Principal;