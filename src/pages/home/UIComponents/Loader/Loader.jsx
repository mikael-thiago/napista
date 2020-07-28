import React from "react";
import "./loader.css";

const Loader = ({ ref }) => {
    return (
        <div ref={ref} className="loader"></div>
    )
}

export default Loader;