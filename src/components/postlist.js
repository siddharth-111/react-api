import React, { Component } from "react";
import axios from "axios";

class Postlist extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                this.setState({
                    todos: response.data
                })
                console.log(response.data);
            })
    }

    render() {
        const { todos } = this.state;

        return (
            <div>
                <h1>
                    List of todos
                </h1>
                {
                    todos.map(todo => <div key = {todo.id}> {todo.title}</div>)
                }

            </div>
        )
    }
}

export default Postlist;