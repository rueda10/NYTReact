import React, { Component } from 'react';

class Results extends Component {
    constructor(props) {
        super(props);
    }

    renderArticles() {
        return this.props.results.map((result) => {
            return (
                <li key={result._id} className="list-group-item">
                    <strong>{result.headline.main}</strong>
                </li>
            )
        });
    }

    render() {
        if (this.props.results.length === 0) {
            return (
                <div></div>
            )
        }

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results</h3>
                </div>
                <ul className="list-group">
                    {this.renderArticles()}
                </ul>
            </div>
        )
    }
}

module.exports = Results;