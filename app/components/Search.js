import React, { Component } from 'react';

import Results from './Results';
import helpers from '../utils/helpers';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: "",
            startYear: "",
            endYear: "",
            searchFired: false,
            results: []
        }

        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleStartYearChange = this.handleStartYearChange.bind(this);
        this.handleEndYearChange = this.handleEndYearChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    handleTopicChange(event) {
        this.setState({ topic: event.target.value });
    }

    handleStartYearChange(event) {
        this.setState({ startYear: event.target.value });
    }

    handleEndYearChange(event) {
        this.setState({ endYear: event.target.value });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchFired) {
            this.setState({
                searchFired: false
            });
            console.log("UPDATED");

            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then((data) => {
                console.log("ARTICLES", data);
                if (data !== this.state.results) {
                    this.setState({ results: data });
                }
            });

            this.setState({
                topic: "",
                startYear: "",
                endYear: ""
            })
        }
    }

    onSearchClick(event) {
        event.preventDefault();
        this.setState({
            searchFired: true
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2 col-lg-3"></div>
                    <div className="col-xs-12 col-md-8 col-lg-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title text-center">Search</h3>
                            </div>
                            <div className="panel-body text-center">
                                <form className="form-horizontal" onSubmit={this.onSearchClick}>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Topic:</label>
                                        <div className="col-sm-10">
                                            <input
                                                value={this.state.topic}
                                                type="text"
                                                className="form-control text-center"
                                                id="topic"
                                                onChange={this.handleTopicChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start Year:</label>
                                        <div className="col-sm-10">
                                            <input
                                                value={this.state.startYear}
                                                type="text"
                                                className="form-control text-center"
                                                id="topic"
                                                onChange={this.handleStartYearChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start Year:</label>
                                        <div className="col-sm-10">
                                            <input
                                                value={this.state.endYear}
                                                type="text"
                                                className="form-control text-center"
                                                id="topic"
                                                onChange={this.handleEndYearChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" type="submit">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Results results={this.state.results} />
            </div>
        );
    }
}

module.exports = Search;