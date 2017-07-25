import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/search"><button className="navbar-brand btn btn-link">NYT Article Scrubber</button></Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/search"><button className="btn btn-link btn-xs">Search</button></Link></li>
                                <li><Link to="/saved"><button className="btn btn-link btn-xs">Saved</button></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {this.props.children}
            </div>
        );
    }
}

module.exports = Main;