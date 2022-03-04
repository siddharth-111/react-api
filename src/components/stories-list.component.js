import React, { Component } from "react";
import StoriesDataService from "../services/stories.service";
import { Modal, Button, Form  } from "react-bootstrap";

export default class StoriesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            searchTitle: "",
            isOpen: false,
            formData: {
                title: "",
                description: "",
                storyStatus: "NEW",
                points : 1
            }
        };

    }

    componentDidMount = () => {
        this.retrieveStories();
    }

    onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }
    

    openModal = () => {
        this.setState({ isOpen: true,
            formData: {
                title: "",
                description: "",
                storyStatus: "NEW",
                points : 1
            }
        });   
    } 

    closeModal = () => this.setState({ isOpen: false });

    submit = () => {

        this.closeModal();

        StoriesDataService.create(this.state.formData)
            .then(response => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        
    }

    handleTitleChange = (e) => {
        let formData = this.state.formData;
        formData.title = e.target.value;
        this.setState({ formData });
    } 


    handleDescriptionChange = (e) => {
        let formData = this.state.formData;
        formData.description = e.target.value;
        this.setState({ formData });
    }

    handlePointsChange = (e) => {
        console.log("caleld points")
        let formData = this.state.formData;
        formData.points = parseInt(e.target.value);
        this.setState({ formData });
    }
    
    handleStatusChange = (e) => {
        console.log("caleld status")
        let formData = this.state.formData;
        formData.storyStatus = e.target.value;
        this.setState({ formData });
    }

    searchTitle = () => {
        StoriesDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    stories: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList = () => {
        this.retrieveStories();
    }

    retrieveStories = () => {
        StoriesDataService.getAll()
            .then(response => {
                console.log(response.data);
                this.setState({
                    stories: response.data
                });
                
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, stories} = this.state;

        return (
            <div className="list row">
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <Form.Group className="mb-3" >
            <Form.Label>Title</Form.Label>
            <Form.Control type="email" placeholder="Enter title" onChange = {this.handleTitleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="email" placeholder="Enter Description" onChange = {this.handleDescriptionChange} />
        </Form.Group>
        
        <Form.Group className="mb-3">
            <Form.Label>Story Points</Form.Label>
            <Form.Select aria-label="Default select example" onChange = { this.handlePointsChange }>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Default select example" onChange = { this.handleStatusChange }>
            <option value="NEW">New</option>
            <option value="COMPLETED">Completed</option>
            <option value="ESTIMATED">Estimated</option>
            </Form.Select>
        </Form.Group>

        
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
          <Button variant="primary" onClick={this.submit}>Create</Button>
        </Modal.Footer>
      </Modal>
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
                <div className="col-md-4">
                        <Button variant="primary" onClick={this.openModal}>
                                Create Story
                        </Button>
                    </div>
                <div>
                    <h4>Stories </h4>
                    <div className="list row">
                        <table className="table table-bordered table-condensed table-striped table-hover">
                            <thead>
                                <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Points</th>
                                <th scope="col">Developer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories &&
                                        stories.map((story, index) => (
                                            <tr key={index} className = "table-row">
                                                <td>{index + 1}</td>
                                                <td>{story.title}</td>
                                                <td>{story.description}</td>
                                                <td>{story.storyStatus}</td>
                                                <td>{story.points}</td>
                                                <td>{story.developer != null ? story.developer.name : ""}</td>
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