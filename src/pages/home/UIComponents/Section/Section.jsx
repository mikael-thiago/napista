import React from "react";
import "./section.css";

const Section = ({ children, title, itemWidth = 200, scrollable = false, maxHeight = "" }) => {

    const scrollableClass = scrollable ? " scrollable" : "";
    return (
        <section className="section">
            <span className="section-span">
                <div className="section-title">
                    {title}
                </div>
            </span>
            <div className={"section-content-" + itemWidth + scrollableClass} style={{ maxHeight: maxHeight }}>
                {children}
            </div>
        </section>
    )
}

export default Section;