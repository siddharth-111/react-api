import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import BitCoinBlocks from "./components/bitcoin-blocks.component";
import StoriesList from "./components/stories-list.component";
import BugsList from "./components/bugs-list.component";
import DeveloperList from "./components/developer-list.component";


class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/stories" className="navbar-brand">
                        bezKoder
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/stories"} className="nav-link">
                                Stories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/bugs"} className="nav-link">
                                Bugs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/developers"} className="nav-link">
                                Developers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/bitcoinblocks"} className="nav-link">
                                Bitcoin list
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/stories"]} component={ StoriesList } />
                        <Route exact path="/bugs" component={BugsList} />
                        <Route exact path="/developers" component={DeveloperList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                        <Route exact path={["/", "/bitcoinblocks"]} component={BitCoinBlocks} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
