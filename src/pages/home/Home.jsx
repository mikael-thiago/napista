import React from "react";
import { Switch, Route } from "react-router-dom";
import Principal from "./routes/Principal/Principal";

import "./home.css"
import Movie from "./routes/Movie/Movie";
import Topbar from "./components/Topbar/Topbar";
import SearchPage from "./routes/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./routes/Favorites/Favorites";


const Home = () => {

    return (
        <div className="home-root">
            <Topbar />
            <Navbar />
            <div className="main-view">
                <Switch>

                    <Route path={"/movie/:id"}>
                        <Movie />
                    </Route>

                    <Route path={"/search/:query/:page"}>
                        <SearchPage />
                    </Route>

                    <Route path={"/favorites"}>
                        <FavoritesPage />
                    </Route>

                    <Route exact path={""}>
                        <Principal />
                    </Route>

                </Switch>
            </div>

        </div>
    );
}

export default Home;