import React from "react";
import "./recommendationItem.css";
import { getImageBaseUrl } from "../../../../../../services/api_config";
import { Link } from "react-router-dom";

const RecommendationItem = ({ recommendation }) => {

    const releaseDate = recommendation.release_date.split("-");

    const year = releaseDate[0];

    const imageBaseUrl = getImageBaseUrl();

    return (
        <Link to={"/movie/" + recommendation.id} className="recommendation-item">
            <div className="recommendation-item-background"

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