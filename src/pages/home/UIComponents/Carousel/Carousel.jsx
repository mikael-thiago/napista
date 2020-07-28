import React, { useRef, useEffect, useState } from "react";

//Styles
import "./carousel.css";

const Carousel = ({ itemWidth = 100, title = "", children }) => {

    const contentRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    var scrollWidth = 0;

    if (contentRef.current) {
        const item = contentRef.current.children.item(0);

        if (item) {
            const computedStyle = getComputedStyle(item);
            const itemSize = parseInt(computedStyle.width) + parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight)

            scrollWidth = itemSize * parseInt(contentRef.current.clientWidth / itemSize);
        }

    }

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
            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft -= scrollWidth }} style={{ position: "absolute", left: "0", zIndex: 2, display: (isOverflowed ? "" : "none") }}>
                <span className="glyphicon glyphicon-chevron-left"></span>
            </button>

            <div className="carousel-content" ref={contentRef}>
                {children}
            </div>

            <button className="carousel-controller" onClick={() => { contentRef.current.scrollLeft += scrollWidth }} style={{ position: "absolute", right: "0", zIndex: 2, display: (isOverflowed ? "" : "none") }}>
                <span className="glyphicon glyphicon-chevron-right"></span>
            </button>
        </section>
    )
}

export default Carousel;