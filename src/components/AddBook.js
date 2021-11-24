import React, { Component } from 'react';
import BookForm from './BookForm';

class AddBook extends Component {

    constructor(props) {
        super(props);
    }

    handleOnSubmit = (book) => {
        console.log(book);
    };

    render() {

        return (
            <React.Fragment>
                <BookForm handleOnSubmit= { this.handleOnSubmit } />
            </React.Fragment>
        )
    }
}

export default AddBook;