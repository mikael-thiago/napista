import React, { useRef, useEffect, useState } from "react";

//Styles
import "./carousel.css";

const Carousel = ({ itemWidth = 100, title = "", children }) => {

    const contentRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    const carouselWidth = (contentRef.current ? contentRef.current.clientWidth : 200);

    useEffect(() => {

        setIsOverflowed(contentRef.current.scrollWidth > contentRef.current.clientWidth);

    }, [contentRef.current])

    return (
        <section className="carousel">
            <div className="carousel-span">
                <div className="carousel-title">
                    {title}
                </div>
            </div>
            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft -= carouselWidth }} style={{ position: "absolute", left: "0", zIndex: 2, display: (isOverflowed ? "" : "none") }}>
                <span className="glyphicon glyphicon-chevron-left"></span>
            </button>

            <div className="carousel-content" ref={contentRef}>
                {children}
            </div>

            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft += carouselWidth }} style={{ position: "absolute", right: "0", zIndex: 2, display: (isOverflowed ? "" : "none") }}>
                <span className="glyphicon glyphicon-chevron-right"></span>
            </button>
        </section>
    )
}

export default Carousel;