import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
    render() {
        let i = Math.PI
        return <div>
            <nav className="navbar navbar-inverse bg-inverse" >
                <a className="navbar-brand" href="#">App</a>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/heroList">Hero List</Link>
                        <Link className="nav-item nav-link" to="#">Link 2</Link>
                    </div>
                </div>
            </nav>
        </div>;
    }
}



