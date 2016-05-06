//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 02/05/2016
//                   isusk246@gmail.com
//
//

// ES6 promise based HTTP request
import axios from 'axios';
//Access to the state
import store from '../create-store';

// Load fake data in Dev mode if no backend
if (__DEV__){
  var fakeData = require('./fake-data').fakeData;
}

export function switchPanel() {
  return {
    type: 'SWITCH_PANEL'
  };
}

export function panelContent(content) {
  return {
    type: 'PANEL_CONTENT',
    content
  };
}

export function maskPanelClick() {
  return {
    type: 'MASK_PANEL_CLICK'
  };
}

export function checkLogin() {
  return {
    type: 'LOGGED_IN',
    state: true
  };
}

export function logout() {
  return {
    type: 'LOGGED_IN',
    state: false
  };
}

export function setCurrentSearchCUValue(value) {
  return {
    type: 'SET_SEARCH_CU_VALUE',
    value
  };
}

export function searchCU() {
  return {
    type: 'SEARCH_CU',
    payload:
      new Promise((resolve, reject) => {
          setTimeout(() => {
            const state = store.getState();
            axios.get(`http://localhost:3000/api/search-cu/${state._app.levySearch.searchCUValue}`)
            .then((response) => resolve(response))
            .catch((response) => reject(response));
          }, (__DEV__) ? 1000 : 0 );
        }).then(function (response) {
          return {data: response.data};
        })
        .catch(function (response) {
          if (__DEV__) {
            console.log('Running in DEV mode and using fake data');
            return {data: fakeData.searchResults};
          } else {
            throw error(response);
          }
        })
  };
}

export function toogleResultItem(code) {
  return {
    type: 'TOOGLE_RESULT_ITEM',
    code
  };
}

export function setCurrentCU(code) {
  return {
    type: 'SET_CURRENT_CU',
    code
  };
}
