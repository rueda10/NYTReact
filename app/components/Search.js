import React, { Component } from 'react';

import Results from './Results';
import helpers from '../utils/helpers';

class Search extends Component {
    constructor(props) {
        super(props);

        // Initial state. Keep track of input text fields and search fired
        this.state = {
            topic: "",
            startYear: "",
            endYear: "",
            searchFired: false,
        }

        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleStartYearChange = this.handleStartYearChange.bind(this);
        this.handleEndYearChange = this.handleEndYearChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    // handles topic input change
    handleTopicChange(event) {
        this.setState({
            topic: event.target.value
        });
    }

    // handles start year change
    handleStartYearChange(event) {
        this.setState({ startYear: event.target.value });
    }

    // handles end year change
    handleEndYearChange(event) {
        this.setState({ endYear: event.target.value });
    }

    // run when component updates and searchFired is true. This will run
    // the axios get request to get the NYT articles
    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchFired) {
            this.setState({
                searchFired: false
            });

            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then((data) => {
                if (data !== this.props.searchResults) {
                    this.props.setSearchResults(data);
                }
            });

            // reset inputs
            this.setState({
                topic: "",
                startYear: "",
                endYear: ""
            })
        }
    }

    // handles search button click and sets searchFired to true
    onSearchClick(event) {
        event.preventDefault();
        this.setState({
            searchFired: true,
        })
        this.props.setCurrentSearch(this.state.topic);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title text-center">Search</h3>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal" onSubmit={this.onSearchClick}>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">Topic:</label>
                                        <div className="col-xs-8">
                                            <input
                                                value={this.state.topic}
                                                type="text"
                                                className="form-control"
                                                onChange={this.handleTopicChange}
                                                placeholder="Search here..."
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">Start Year:</label>
                                        <div className="col-xs-8">
                                            <input
                                                value={this.state.startYear}
                                                type="text"
                                                className="form-control"
                                                onChange={this.handleStartYearChange}
                                                placeholder="YYYY"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">End Year:</label>
                                        <div className="col-xs-8">
                                            <input
                                                value={this.state.endYear}
                                                type="text"
                                                className="form-control"
                                                onChange={this.handleEndYearChange}
                                                placeholder="YYYY"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary" type="submit">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Results results={this.props.searchResults} currentSearch={this.props.currentSearch} />
            </div>
        );
    }
}

module.exports = Search;