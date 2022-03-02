import React, { Component } from "react";
import DeveloperDataService from "../services/developer.service";

export default class DeveloperList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveStories = this.retrieveStories.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            developers: [],
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveStories();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    searchName() {
        DeveloperDataService.findByTitle(this.state.searchName)
            .then(response => {
                this.setState({
                    developers: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
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
        const { searchName, developers} = this.state;

        return (
            <div className="list row">
                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
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