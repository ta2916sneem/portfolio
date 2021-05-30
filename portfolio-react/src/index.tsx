import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import {Provider} from 'react-redux';
import store from "./factory/store";
import './styles/main.css'

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
  document.getElementById('root')
);
