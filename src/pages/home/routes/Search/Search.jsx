import React, { useEffect, useState, useRef } from "react";
import { withRouter, Link } from "react-router-dom";

//Functions
import { getSearchResult } from "../../../../api-calls/api-calls";
import { getImageBaseUrl } from "../../../../api_config";

//Components
import Section from "../../components/Section/Section";
import MovieCard from "../../components/MovieCard/MovieCard";

//Styles
import "./search.css";
import Loader from "../../Widgets/Loader/Loader";

const generateArray = (n) => {
    let array = Array(n);

    for (var i = 0; i < n; i++)
        array[i] = i;

    return array;
}

const SearchPage = withRouter(({ match }) => {

    const query = match.params.query;
    const page = match.params.page || 1;

    const pagesLinksRef = useRef();

    const [searchResult, setSearchResult] = useState({
        results: [],
        totalPages: 0,
        loaded: false
    });

    const movies = searchResult.results;
    const totalPages = searchResult.totalPages;

    const sectionTitle = searchResult.results.length !== 0 ? ("Resultados encontrados para " + query) : "Não foram encontrados resultados";

    useEffect(() => {
        getSearchResult(query, page).then((searchResultResponse) => {
            setSearchResult({
                results: searchResultResponse.results,
                totalPages: searchResultResponse.total_pages,
                loaded: true
            });

        });

    }, [query, page]);

    const scrollToPageLink = (number) => {
        let linkClicked = document.getElementById("page-link-" + number);

        pagesLinksRef.current.scrollLeft = linkClicked.offsetLeft - (linkClicked.offsetParent.clientWidth / 2);

    }

    return (
        searchResult.loaded ?
            (<div className="search-wrapper">
                <div className="search-content">
                    <Section title={sectionTitle} aditional={totalPages > 0 ? "Página " + page + " de " + totalPages : ""}>
                        {movies.map((movie, index) => (
                            <MovieCard movie={movie} imageBaseUrl={getImageBaseUrl()} key={index} />
                        ))}
                    </Section>
                </div>

                {totalPages > 0 ? (
                    <>
                        <div className="search-pages-links" >

                            <button className="search-pages-links-controller" onClick={() => { pagesLinksRef.current.scrollLeft -= 200 }} style={{ position: "absolute", left: "15%" }}>
                                <span className="glyphicon glyphicon-chevron-left"></span>
                            </button>


                            <div className="search-pages-links-wrapper" ref={pagesLinksRef}>
                                {generateArray(totalPages).map((_, index) => (
                                    <Link id={"page-link-" + (index + 1)} onClick={() => scrollToPageLink(index + 1)} key={index} to={"/search/" + query + "/" + (index + 1)}>
                                        {index + 1}
                                    </Link>
                                ))}
                            </div>

                            <button className="search-pages-links-controller" onClick={() => { pagesLinksRef.current.scrollLeft += 200 }} style={{ position: "absolute", right: "15%" }}>
                                <span className="glyphicon glyphicon-chevron-right"></span>
                            </button>


                        </div>
                    </>
                ) : <></>}


            </div>) : <Loader />
    )
});

export default SearchPage;