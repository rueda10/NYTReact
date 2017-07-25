import React from 'react';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';

import Main from '../components/Main';
import Search from '../components/Search';
import Saved from '../components/Saved';

module.exports = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="search" component={Search} />
            <Route path="saved" component={Saved} />

            <IndexRoute component={Search} />
        </Route>
    </Router>
);