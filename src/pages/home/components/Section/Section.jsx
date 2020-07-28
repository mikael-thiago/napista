import React from "react";

//Styles
import "./section.css";

const Section = ({ children, title, aditional = "", maxHeight = "" }) => {

    return (
        <section className="section">
            <span className="section-span">
                <div className="section-title">
                    {title}
                </div>
                <div className="section-aditional">
                    {aditional}
                </div>
            </span>
            <div className={"section-content"} style={{ maxHeight: maxHeight }}>
                {children}
            </div>
        </section>
    )
}

export default Section;