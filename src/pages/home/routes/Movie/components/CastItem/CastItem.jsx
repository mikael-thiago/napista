import React from "react";
import { getImageBaseUrl } from "../../../../../../api_config";

//Styles
import "./castItem.css";

const CastItem = ({ cast }) => {

    const imageBaseUrl = getImageBaseUrl();
    const imageUrl = (cast.profile_path !== null && cast.profile_path !== undefined) ? imageBaseUrl + "/w185" + cast.profile_path : "";

    return (
        <div className="cast-item">
            <div className="cast-photo">
                <img src={imageUrl} alt="" />
            </div>

            <div className="cast-text">
                <div className="cast-name">
                    {cast.name}
                </div>
                <div className="cast-character">
                    {cast.character}
                </div>
            </div>
        </div>
    )
}

export default CastItem;