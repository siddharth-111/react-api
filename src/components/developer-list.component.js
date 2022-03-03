import React, { Component } from "react";
import DeveloperDataService from "../services/developer.service";
import { Modal, Button, Form  } from "react-bootstrap";


export default class DeveloperList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            developers: [],
            searchName: "",
            isOpen: false,
            formData: {
                name: ""
            }
        };
    }

    componentDidMount = () => {
        this.retrieveDevelopers();
    }

    openModal = () => {
        this.setState({ isOpen: true,
            formData: {
                name: ""
            }
        });   
    } 

    closeModal = () => this.setState({ isOpen: false });

    submit = () => {
        this.closeModal();

        DeveloperDataService.create(this.state.formData)
            .then(response => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        
    }

    handleNameChange = (e) => {
        let formData = this.state.formData;
        formData.name = e.target.value;
        this.setState({ formData });
    } 

    onChangeSearchName = (e) => {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    searchName = () => {
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

    retrieveDevelopers = () => {
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

    refreshList = () => {
        this.retrieveDevelopers();
    }

    render() {
        const { searchName, developers} = this.state;

        return (
            <div className="list row">
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
          <Modal.Title>Create Developer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange = {this.handleNameChange} />
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
                <div className="col-md-4">
                        <Button variant="primary" onClick={this.openModal}>
                                Add Developer
                        </Button>
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