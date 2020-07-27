import React from "react";
import { getImageBaseUrl } from "../../../../../../services/api_config";
import blank_avatar from "../../../../../../images/blank-avatar.png";
import "./castItem.css";

const CastItem = ({ cast }) => {

    const imageBaseUrl = getImageBaseUrl();
    const imageUrl = (cast.profile_path !== null && cast.profile_path !== undefined) ? imageBaseUrl + "/original" + cast.profile_path : "";

    return (
        <div className="cast-item">
            <div className="cast-photo">
                <img src={imageUrl ? imageUrl : blank_avatar} alt="" />
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