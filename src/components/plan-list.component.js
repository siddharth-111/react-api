import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import StoriesDataService from "../services/stories.service";

export default class PlanList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveStories = this.retrieveStories.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.assign = this.assign.bind(this);

        this.state = {
            plans: [],
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveStories();
    }

    assign() {
        let assignments = [];

        this.state.plans.forEach(plan => {
           plan.developerWeekPlanList.forEach(developer => {
                developer.storyList.forEach(story => {
                    assignments.push({
                        issueId: story.issueId,
                        developerId: developer.developerId
                    });
                });
           });
        });

        StoriesDataService.assignPlan(assignments)
            .then(response => {
                this.setState({ redirect: "/stories" });
                // window.location.href = "/stories";
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveStories() {
        StoriesDataService.getPlan()
            .then(response => {
                console.log(response.data);
                this.setState({
                    plans: response.data
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { searchTitle, plans } = this.state;
        return (
            <div className="list row">
                            {plans &&
                                plans.map((plan, index) => (
                                    <div key={index}  className="col-lg-6 mb-4">
                <div className="card">
                    <div className="card-body">
                                      <h2 className="card-text text-center"> Week Number {plan.weekNumber} </h2> 

                          {plan.developerWeekPlanList.map((developer, index) => (
                            <div key={index}  className="card-text">
                                <h5>Stories List for {developer.name} </h5>
                                <div>
                                    <div className="list row">
                                        <table className="table table-bordered table-condensed table-striped table-hover">
                                            <thead>
                                                <tr>
                                                <th scope="col">S.No.</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {developer.storyList &&
                                                        developer.storyList.map((story, index) => (
                                                            <tr key={index} className = "table-row">
                                                                <td>{index + 1}</td>
                                                                <td>{story.title}</td>
                                                                <td>{story.description}</td>
                                                                <td>{story.storyStatus}</td>
                                                                <td>{story.points}</td>
                                                            </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          ))}              
                    </div>
                </div>
            </div>
                                    
            ))}
            {plans && plans.length > 0 &&
                <div className="input-group mb-3">
                <div className="input-group-append">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.assign}
                    >
                        Assign
                    </button>
                </div>
            </div>
      }
                
            </div>
        );
    }
}