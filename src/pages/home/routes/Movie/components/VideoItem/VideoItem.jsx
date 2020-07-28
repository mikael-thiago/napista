import React from "react";

import "./videoItem.css";

const videoPlatformBaseUrl = (platform) => {
    if (platform === "YouTube") return "https://www.youtube.com/embed/";
}

const VideoItem = ({ video }) => {

    const src = videoPlatformBaseUrl(video.site) + video.key;

    return (
        <div className="video-item">
            <iframe title={video.name} width="100%" height="100%" src={src}
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen >
            </iframe>
        </div>

    )
}

export default VideoItem;
