import React, { Component } from "react";
import BugsDataService from "../services/bugs.service";
import { Modal, Button, Form  } from "react-bootstrap";

export default class BugsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugs: [],
            searchTitle: "",
            isOpen: false,
            formData: {
                title: "",
                description: "",
                bugStatus: "NEW",
                priority : "MINOR"
            }
        };
    }

    componentDidMount = () => {
        this.retrieveStories();
    }

    openModal = () => {
        this.setState({ isOpen: true,
            formData: {
                title: "",
                description: "",
                bugStatus: "NEW",
                priority : "MINOR"
            }
        });   
    } 

    closeModal = () => this.setState({ isOpen: false });

    onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    submit = () => {
        this.closeModal();

        BugsDataService.create(this.state.formData)
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

    handlePriorityChange = (e) => {
        let formData = this.state.formData;
        formData.priority = e.target.value;
        this.setState({ formData });
    }
    
    handleStatusChange = (e) => {
        let formData = this.state.formData;
        formData.bugStatus = e.target.value;
        this.setState({ formData });
    }

    searchTitle = () => {
        BugsDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    bugs: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveStories = () => {
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

    refreshList = () => {
        this.retrieveStories();
    }

    render = () => {
        const { searchTitle, bugs} = this.state;

        return (
            <div className="list row">
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bug</Modal.Title>
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
        
        <Form.Group className="mb-3" >
            <Form.Label>Priority</Form.Label>
            <Form.Select aria-label="Default select example" onChange = { this.handlePriorityChange }>
            <option value="MINOR">Minor</option>
            <option value="MAJOR">Major</option>
            <option value="CRITICAL">Critical</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Default select example" onChange = { this.handleStatusChange }>
            <option value="NEW">New</option>
            <option value="VERIFIED">Verified</option>
            <option value="RESOLVED">Resolved</option>
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
                                Create Bug
                        </Button>
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
                                <th scope="col">Developer</th>
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
                                                <td>{bug.developer != null ? bug.developer.name : ""}</td>
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