//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 09/05/2016
//                   isusk246@gmail.com
//
//

// Stylesheets
import 'normalize-scss';
import './styles/screen.scss';
import './styles/octicons/octicons.scss';

// ES6 Polyfill
import 'babel-polyfill';

// REACT Dependencies
import WebFont from 'webfontloader';
import React from 'react';
import ReactDOM from 'react-dom';

// REDUX STORE
import Store from './redux/create-store';
import { Provider } from 'react-redux';

// Custom components
import App from './components/App';

const initialState = {
  _app: {
    refresh: false,
    pageHeader: undefined,
    panelActive: false,
    panelContent: 'ACCCover',
    register:{
      regCodeValue: undefined,
      irdNumberValue: undefined,
      emailValue: undefined
    },
    // note: loggedIn starts as undefined.  It performs a force logout in case OpenAM still has an active session for a different user.
    loggedIn: undefined,
    loggingIn: false,
    loggingOut: false,
    registering: false,
    fetchingParties: false,
    fetchingAccount: false,
    confirmingCoverDetails: false,
    confirmCoverDetailsSuccess: false,
    accountNumber: undefined,
    accNumber: undefined,
    accountName: undefined,
    taxYear: undefined,
    employmentStatus: undefined,
    levyClassification: {
      code: undefined,
      description: undefined
    },
    levySearch: {
      searching: false,
      searchCUValue: undefined,
      searchResults: []
    },
    cuChanged: false,
    bicHost: undefined,
    customer: undefined,
    registrationError: undefined,
    sorryError: undefined
  }
};

WebFont.load({
  google: {
    families: ['Roboto:400,700,100']
  }
});

// Element to attach React-DOM
const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <Provider store={ Store.configureStore(initialState) }>
        <App />
    </Provider>
  , app);
