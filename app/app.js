import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// This code here allows us to render our main component (in this case Parent)
ReactDOM.render(
    routes, document.getElementById("app")
);
