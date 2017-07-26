import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/search"><button className="navbar-brand btn btn-link">NYT Article Scrubber</button></Link>
                        </div>

                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/search"><button className="btn btn-link btn-xs">Search</button></Link></li>
                            <li><Link to="/saved"><button className="btn btn-link btn-xs">Saved</button></Link></li>
                        </ul>
                    </div>
                </nav>

                {this.props.children}
            </div>
        );
    }
}

module.exports = Main;