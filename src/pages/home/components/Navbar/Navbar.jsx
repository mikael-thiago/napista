import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { NavbarButton } from "../Topbar/Topbar";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-header">
                <NavbarButton />
            </div>
            <div className="navbar-body">
                <nav className="navbar-nav">
                    <ul>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="">
                                <span className="navbar-item-icon glyphicon glyphicon-home"></span>
                                <div className="navbar-item-text">Início</div>
                            </Link>
                        </li>

                        <li className="navbar-item">
                            <Link className="navbar-link" to="/favorites">
                                <span className="navbar-item-icon glyphicon glyphicon-heart"></span>
                                <div className="navbar-item-text">Favoritos</div>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;