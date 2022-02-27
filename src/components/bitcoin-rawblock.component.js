import React, { Component } from "react";
import BitCoinService from "../services/bitcoin.service.js";
import { Link } from "react-router-dom";

export default class BitCoinRawBlock extends Component {
    constructor(props) {
        super(props);
        // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBlocks = this.retrieveBlocks.bind(this);
        this.refreshList = this.refreshList.bind(this);
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
        BitCoinService.get()
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
                <table className="table table-bordered table-condensed table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Hash</th>
                    <th scope="col">Time</th>
                    <th scope="col">Height</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks &&
                            blocks.map((block, index) => (
                                <tr key={index} className = "table-row">
                                    <td><a href = {"/rawblock/" + block.hash }>{block.hash}</a></td>
                                    <td >{block.time}</td>
                                    <td >{block.height}</td>
                                </tr>
                    ))}
                </tbody>
                </table>
            </div>
        );
    }
}