import React, { Component } from "react";
import BitCoinService from "../services/bitcoin.service.js";
import { Link } from "react-router-dom";

export default class BitCoinBlocks extends Component {
    constructor(props) {
        super(props);
        // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBlocks = this.retrieveBlocks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        // this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            blocks: [],
            size: 0
        };
    }

    componentDidMount() {
        this.retrieveBlocks();
    }

    // onChangeSearchTitle(e) {
    //     const searchTitle = e.target.value;

    //     this.setState({
    //         searchTitle: searchTitle
    //     });
    // }

    retrieveBlocks() {
        BitCoinService.getAll()
            .then(response => {
                this.setState({
                    blocks: response.data.blockChainResponseList,
                    size: response.data.size
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBlocks();
    }


    render() {
        const { blocks } = this.state;

        return (
            <div className="list row">
                    <div className="col-md-6">
                    <h4>Blocks</h4>

                    <ul className="list-group">
                        {blocks &&
                        blocks.map((block, index) => (
                            <li
                                className={
                                    "list-group-item"
                                }
                                key={index}
                            >
                                {block.hash}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}