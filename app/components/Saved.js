import React, { Component } from 'react';
import _ from 'lodash';

import helpers from '../utils/helpers';

class Saved extends Component {
    constructor(props) {
        super(props);

        this.state = {
            savedArticles: {}
        };
    }

    // get articles from DB when component initially renders
    componentDidMount() {
        helpers.getArticles().then((results) => {
            this.setState({
                savedArticles: results.data
            })
        });
    }

    // handles remove button click
    onRemoveClick(articleId) {
        helpers.deleteArticle(articleId).then(() => {
            helpers.getArticles().then((results) => {
                this.setState({
                    savedArticles: results.data
                });
            })
        });
    }

    // Renders saved articles
    renderArticles() {
        return this.state.savedArticles.map((article) => {
            const dateDisplay = new Date(article.date);
            return (
                <li key={article._id} className="list-group-item">
                    <div className="row">
                        <div className="col-xs-9 col-sm-10 col-md-11">
                            <h4 className="list-group-item-heading">{article.title}</h4>
                            <h6 className="date-display">Saved on <em>{dateDisplay.toLocaleString()}</em></h6>
                            <p className="list-group-item-text">{article.snippet} <a target="_blank" href={article.url}>[Read More]</a></p>
                        </div>
                        <div className="col-xs-3 col-sm-2 col-md-1">
                            <button className="btn btn-danger btn-xs pull-right" onClick={() => this.onRemoveClick(article._id)}>Remove</button>
                        </div>
                    </div>
                </li>
            )
        });
    }

    render() {
        // If no articles in DB
        if (_.isEmpty(this.state.savedArticles)) {
            return (
                <div className="container">
                    <h1>No saved articles.</h1>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">Saved Articles</h3>
                    </div>
                    <ul className="list-group">
                        {this.renderArticles()}
                    </ul>
                </div>
            </div>
        )
    }
}

module.exports = Saved;