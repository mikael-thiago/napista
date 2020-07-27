import React, { useRef } from "react";

//Styles
import "./carousel.css";

const Carousel = ({ cast, itemWidth = 100, children }) => {
    const contentRef = useRef();

    return (
        <section className="carousel">
            <div className="carousel-span">
                <div className="carousel-title">
                    Elenco
                </div>
            </div>
            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft -= itemWidth * 5 }} style={{ position: "absolute", left: "0", zIndex: 2 }}>
                <span className="glyphicon glyphicon-chevron-left"></span>
            </button>

            <div className="carousel-content" ref={contentRef}>
                {children}
            </div>

            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft += itemWidth * 5 }} style={{ position: "absolute", right: "0", zIndex: 2 }}>
                <span className="glyphicon glyphicon-chevron-right"></span>
            </button>
        </section>
    )
}

export default Carousel;