import React, { Component }  from 'react';


class BooksList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { todos } = this.state;

        return (
                <h2>List of books</h2>
        )
    }
}

export default BooksList;