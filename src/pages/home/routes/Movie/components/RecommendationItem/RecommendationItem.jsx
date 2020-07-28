import React, { useRef } from "react";
import "./recommendationItem.css";
import { getImageBaseUrl } from "../../../../../../services/api_config";
import { Link } from "react-router-dom";

const RecommendationItem = ({ recommendation }) => {

    const cardBackgroundRef = useRef();

    const releaseDate = recommendation.release_date.split("-");

    const year = releaseDate[0];

    const imageBaseUrl = getImageBaseUrl();

    const brightOnHover = () => {
        cardBackgroundRef.current.style.filter = "brightness(.65)";
    }

    const unbrightOnHover = () => {
        cardBackgroundRef.current.style.filter = "";
    }

    return (
        <Link to={"/movie/" + recommendation.id} className="recommendation-item" onMouseEnter={brightOnHover} onMouseLeave={unbrightOnHover}>
            <div className="recommendation-item-background"
                ref={cardBackgroundRef}
                style={{ backgroundImage: "url('" + imageBaseUrl + "w780" + recommendation.backdrop_path + "')" }}
            >

            </div>
            <div className="recommendation-item-text">
                <div className="recommendation-item-text-wrapper">
                    <div className="recommendation-item-title">
                        {recommendation.title}
                    </div>
                    <div className="recommendation-item-year-average">
                        <div className="recommendation-item-year">
                            {year}
                        </div>
                        <div className="recommendation-item-average">
                            {recommendation.vote_average + "/10"}
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default RecommendationItem;