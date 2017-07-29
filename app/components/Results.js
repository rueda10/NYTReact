import React, { Component } from 'react';
import _ from 'lodash';

import helpers from '../utils/helpers';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            savedArticles: []
        };
    }

    // get saved articles from db when component initially renders
    componentDidMount() {
        helpers.getArticles().then((results) => {
            if (results.data) {
                this.setState({
                    savedArticles: results.data
                });
            }
        });
    }

    // save button click handler. Saves articles to DV and gets the new list of articles from DB
    onSaveClick(title, snippet, url) {
        helpers.saveArticle(title, snippet, url).then(() => {
            helpers.getArticles().then((results) => {
                this.setState({
                    savedArticles: results.data
                });
            })
        });
    }

    // handles remove button click. Removes articles from db and gets new list of articles from DB to render
    onRemoveClick(articleId) {
        helpers.deleteArticle(articleId).then(() => {
            helpers.getArticles().then((results) => {
                this.setState({
                    savedArticles: results.data
                });
            })
        });
    }

    renderArticles() {
        // render all articles from search results. Use the DB articles' ID to determine whether article in
        // results is saved or not. Render Save or Remove buttons depending on that
        return this.props.results.map((result) => {
            return (
                <li key={result._id} className="list-group-item">
                    <div className="row">
                        <div className="col-xs-9 col-sm-10 col-md-11">
                            <h4 className="list-group-item-heading">{result.headline.main}</h4>
                            <p className="list-group-item-text">{result.snippet} <a target="_blank" href={result.web_url}>[Read More]</a></p>
                        </div>
                        <div className="col-xs-3 col-sm-2 col-md-1">
                            {
                                _.find(this.state.savedArticles, { url: result.web_url }) ?
                                    <button className="btn btn-danger btn-xs pull-right" onClick={() => this.onRemoveClick(_.find(this.state.savedArticles, { url: result.web_url })._id)}>
                                        Remove
                                    </button>
                                        :
                                    <button className="btn btn-warning btn-xs pull-right" onClick={() => this.onSaveClick(result.headline.main, result.snippet, result.web_url)}>
                                        Save
                                    </button>
                            }
                        </div>
                    </div>
                </li>
            )
        });
    }

    render() {
        // If no results, render empty div
        if (this.props.results.length === 0) {
            return (
                <div></div>
            )
        }

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results for {this.props.currentSearch}</h3>
                </div>
                <ul className="list-group">
                    {this.renderArticles()}
                </ul>
            </div>
        )
    }
}

module.exports = Results;