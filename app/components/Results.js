import React, { Component } from 'react';

import helpers from '../utils/helpers';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        helpers.getArticles().then(function(response) {
            console.log("RESPONSE", response);
            if (response !== this.state.articles) {
                console.log("ARTICLES", response.data)
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="container">
                <h1>RESULTS COMPONENT</h1>
            </div>
        )
    }
}

module.exports = Results;