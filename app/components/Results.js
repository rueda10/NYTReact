import React, { Component } from 'react';

import helpers from '../utils/helpers';

class Results extends Component {
    constructor(props) {
        super(props);
    }

    onSaveClick(title, snippet, url) {
        helpers.saveArticle(title, snippet, url);
    }

    renderArticles() {
        return this.props.results.map((result) => {
            return (
                <li key={result._id} className="list-group-item">
                    <div className="row">
                        <div className="col-xs-9 col-sm-10 col-md-11">
                            <h4 className="list-group-item-heading">{result.headline.main}</h4>
                            <p className="list-group-item-text">{result.snippet} <a target="_blank" href={result.web_url}>[Read More]</a></p>
                        </div>
                        <div className="col-xs-3 col-sm-2 col-md-1">
                            <button className="btn btn-warning btn-xs pull-right" onClick={() => this.onSaveClick(result.headline.main, result.snippet, result.web_url)}>Save</button>
                        </div>
                    </div>
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