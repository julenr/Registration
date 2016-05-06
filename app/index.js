//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 29/04/2016
//                   isusk246@gmail.com
//
//

// Stylesheets
import 'normalize.css';
import './styles/screen.scss';
import './styles/font-awesome/scss/font-awesome.scss';

// ES6 Polyfill
import 'babel-polyfill';

// REACT Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// REDUX STORE
import store from './redux/create-store';
import { Provider } from 'react-redux';

// Custom components
import App from './components/App';

// Element to attach React-DOM
const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
  , app);
