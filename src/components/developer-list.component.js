import React, { Component } from "react";
import DeveloperDataService from "../services/developer.service";

export default class DeveloperList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveStories = this.retrieveStories.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            developers: [],
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveStories();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveStories() {
        DeveloperDataService.getAll()
            .then(response => {
                this.setState({
                    developers: response.data
                });
                
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveStories();
    }

    render() {
        const { searchTitle, developers, currentTutorial, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4> Developers </h4>
                    <div className="list row">
                        <table className="table table-bordered table-condensed table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {developers &&
                                        developers.map((developer, index) => (
                                            <tr key={index} className = "table-row">
                                                <td>{index + 1}</td>
                                                <td>{developer.name}</td>
                                            </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                </div>            
            </div>
        );
    }
}