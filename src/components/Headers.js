import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <h1>Book Management App</h1>
                <hr />
                <div className="links">
                    <NavLink to="/" className="link" activeClassName="active" exact>
                        Books List
                    </NavLink>
                    <NavLink to="/add" className="link" activeClassName="active">
                        Add Book
                    </NavLink>
                </div>
            </header>
        );
    }
}

export default Header;