import React, { Component } from "react";
import BugsDataService from "../services/bugs.service";

export default class BugsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveStories = this.retrieveStories.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            bugs: [],
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

    searchTitle() {
        BugsDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    bugs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveStories() {
        BugsDataService.getAll()
            .then(response => {
                this.setState({
                    bugs: response.data
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
        const { searchTitle, bugs} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
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
                    <h4>Bugs </h4>
                    <div className="list row">
                        <table className="table table-bordered table-condensed table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bugs &&
                                        bugs.map((bug, index) => (
                                            <tr key={index} className = "table-row">
                                                <td>{index + 1}</td>
                                                <td>{bug.title}</td>
                                                <td>{bug.description}</td>
                                                <td>{bug.bugStatus}</td>
                                                <td>{bug.priority}</td>
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