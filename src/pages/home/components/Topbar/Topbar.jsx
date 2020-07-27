import React, { useRef } from "react";
import "./topbar.css";

import { withRouter } from "react-router-dom";

const SearchInput = withRouter(({ history, match }) => {

    const inputRef = useRef();

    const query = match.params.query;

    const handleInputChange = (e) => {

        if (e.target.value !== "") {
            history.push("/search/" + e.target.value + "/1");
        } else {
            history.push("/");
        }

    }

    return (
        <div className="search-input-wrapper">
            <span className="search-input-icon glyphicon glyphicon-search"></span>

            <input type="text" ref={inputRef} value={query} onChange={handleInputChange} placeholder="Busque aqui seus filmes" className="search-input">
            </input>
        </div>

    );
});

const NavbarButton = () => {

    const toggleNavbar = () => {
        let navbar = document.getElementsByClassName("navbar")[0];

        if (!navbar.style.transform)
            navbar.style.transform = "translateX(0)";
        else
            navbar.style.transform = "";

    }

    return (
        <button onClick={toggleNavbar} className="navbar-button">
            <span className="glyphicon glyphicon-menu-hamburger"></span>
        </button>
    )
}

const Topbar = () => {
    return (
        <div className="topbar">
            <NavbarButton />
            <SearchInput />
        </div>
    )
}

export { NavbarButton };
export default Topbar;