import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
    constructor(props) {
        super(props);

        // keep track of search results in this component to maintain results up in Results component
        this.state = {
            searchResults: [],
            currentSearch: ''
        };

        this.setSearchResults = this.setSearchResults.bind(this);
        this.setCurrentSearch = this.setCurrentSearch.bind(this);
    }

    // this method is passed on to children components to maintain search results visible
    setSearchResults(results) {
        this.setState({
            searchResults: results
        });
    }

    setCurrentSearch(currentSearch) {
        this.setState({
            currentSearch: currentSearch
        });
    }

    render() {
        // Use this to pass props on to this.props.children
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                setSearchResults: this.setSearchResults,
                setCurrentSearch: this.setCurrentSearch,
                searchResults: this.state.searchResults,
                currentSearch: this.state.currentSearch
            })
        );

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

                {childrenWithProps}
            </div>
        );
    }
}

module.exports = Main;