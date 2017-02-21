import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return <div>
            <header>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand" activeClassName="active">App</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="heroList">Hero List</Link></li>
                            <li><Link to="hero">Hero</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className="container-fluid">
                <div className="starter-template">
                    {this.props.children}
                </div>
            </section>
        </div>
    }
}



