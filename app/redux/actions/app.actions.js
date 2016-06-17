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

import * as types from './ActionTypes';

import Store from '../create-store';
import Window from '../../util/Window';

// Load fake data in Dev mode if no backend
if (__LOCAL_DEV__){
  var fakeData = require('./fake-data').fakeData;
}

export function pageHeader(content) {
    return {
      type: types.PAGE_HEADER,
      content
    };
  }

export function switchPanel() {
  return {
    type: types.SWITCH_PANEL
  };
}

export function panelContent(content) {
  return {
    type: types.PANEL_CONTENT,
    content
  };
}

export function clearRegistrationError() {
  return {
    type: types.CLEAR_REGISTRATION_ERROR
  };
}

export function setRegCodeValue(value) {
  return {
    type: types.SET_REG_CODE_VALUE,
    value
  };
}

export function setIrdNumberValue(value) {
  return {
    type: types.SET_IRD_NUMBER_VALUE,
    value
  };
}

export function setEmailValue(value) {
  return {
    type: types.SET_EMAIL_VALUE,
    value
  };
}

export function logout() {
  return{
    type: types.LOGOUT,
    payload:
        new Promise((resolve, reject) => {
          axios.get('/logout')
          .then((response) => resolve(response))
          .catch((response) => reject(response));
        }).then(function (response) {
          return {};
        })
        .catch(function (response) {
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and using fake data');
            return {};
          }
          return Promise.reject(response);
        })
  };
}

export function register(registerData) {
  return{
    type: types.REGISTER,
    payload:
        new Promise((resolve, reject) => {
          const regCode = encodeURIComponent(registerData.regCodeValue);
          const irdNumber = encodeURIComponent(registerData.irdNumberValue,"UTF8");
          const email = encodeURIComponent(registerData.emailValue);
          const correlationId = createCorrelationId();
          axios.put(`/api-unauth/users/register?cid=${correlationId}&regCode=${regCode}&irdNumber=${irdNumber}&email=${email}&gotoUrl=%2Fbusiness%2Fregister%2F%23CoverDetails`)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
        }).then(function (response) {
          if (response.data.error) {
            return Promise.reject(response);
          }
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and bypassing RealMe');
            response.data.redirectUrl = '#CoverDetails?userId=' + response.data.userId;
          }
          if (response.data.redirectUrl) {
            Window.redirect(response.data.redirectUrl);
            return {data: response.data};
          }
          return Promise.reject(response);
        })
        .catch(function (response) {
          if (response.data.error) {
            return Promise.reject(response.data.error);
          }
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and using fake data');
            Window.redirect('/business/register/#CoverDetails');
            return {data: accountNumber};
          }
          return Promise.reject();
        })
  };
}

export function fetchParties() {
  const correlationId = createCorrelationId();
  return {
    type: types.FETCH_PARTIES,
    payload:
      new Promise((resolve, reject) => {
          setTimeout(() => {
            const config = {};
            if (__LOCAL_DEV__) {
              console.log('Running in DEV mode and bypassing OpenAM');
              config.headers = { 'MyACC-UserID' : getUrlParameter('userId') };
            }
            axios.get(`/api/customeraccount/parties?cid=${correlationId}`, config)
            .then((response) => resolve(response))
            .catch((response) => reject(response));
          }, (__LOCAL_DEV__) ? 1000 : 0 );
        }).then(function (response) {
          if (response.headers['content-type'] === 'application/json') {
            var accountNumber = response.data[0].accountNumber;
            Store.dispatch(fetchAccount(correlationId, accountNumber));
            return {data: accountNumber};
          }
          // we received a text/html response from OpenAM asking the user to login
          return Promise.reject('unauthenticated');
        })
        .catch(function (response) {
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and using fake data');
            const accountNumber = fakeData.accountNumber;
            Store.dispatch(fetchAccount(correlationId, accountNumber));
            return {data: accountNumber};
          }
          return Promise.reject(response);
        })
  };
}

export function fetchAccount(correlationId, accountNumber) {
  return {
    type: types.FETCH_ACCOUNT,
    payload:
      new Promise((resolve, reject) => {
          setTimeout(() => {
            const config = {};
            if (__LOCAL_DEV__) {
              console.log('Running in DEV mode and bypassing OpenAM');
              config.headers = { 'MyACC-UserID' : getUrlParameter('userId') };
            }
            axios.get(`/api/customeraccount/parties/${accountNumber}?cid=${correlationId}`, config)
            .then((response) => resolve(response))
            .catch((response) => reject(response));
          }, (__LOCAL_DEV__) ? 1000 : 0 );
        }).then(function (response) {
          return {data: response.data};
        })
        .catch(function (response) {
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and using fake data');
            return {data: fakeData.account};
          }
          return Promise.reject(response);
        })
  };
}

export function confirmCoverDetails(customer) {
  return {
    type: types.CONFIRM_DETAILS,
    payload:
      new Promise((resolve, reject) => {
        const accountNumber = encodeURIComponent(customer.accountNumber);
        const correlationId = createCorrelationId();
        const config = {};
        if (__LOCAL_DEV__) {
          console.log('Running in DEV mode and bypassing OpenAM');
          config.headers = { 'MyACC-UserID' : getUrlParameter('userId') };
        }
        axios.put(`/api/customeraccount/parties/${accountNumber}?cid=${correlationId}`, customer, config)
          .then((response) => resolve(response))
          .catch((response) => reject(response));
      }).then(function (response) {
        return {data: response.data};
      })
      .catch(function (response) {
        if (__LOCAL_DEV__) {
          console.log('Running in DEV mode and using fake data');
          return {data: fakeData.customer};
        }
        return Promise.reject(response);
      })
  };
}

export function setCurrentSearchCUValue(value) {
  return {
    type: types.SET_SEARCH_CU_VALUE,
    value
  };
}

export function searchCU(srchText,bicHost) {
  return {
    type: types.SEARCH_CU,
    payload:
      new Promise((resolve, reject) => {
          setTimeout(() => {
            var filters = "filter[include]=cu&filter[include]=anzsic&filter[include]=bicrefs&filter[include]=historyBic";
            axios.get(`${bicHost}bics/search?term=${encodeURIComponent(srchText)}&${filters}`)
            .then((response) => resolve(response))
            .catch((response) => reject(response));
          }, (__LOCAL_DEV__) ? 1000 : 0 );
        }).then(function (response) {
          return {data: response.data.bics};
        })
        .catch(function (response) {
          if (__LOCAL_DEV__) {
            console.log('Running in DEV mode and using fake data');
            return {data: fakeData.searchResults};
          }
          return Promise.reject(response);
        })
  };
}

export function searchCUByID(srchID,bicHost) {
    return {
        type: types.SEARCH_CU,
        payload:
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    var filters = "filter[include]=cu&filter[include]=anzsic&filter[include]=bicrefs&filter[include]=historyBic";
                    axios.get(`${bicHost}bics/${encodeURIComponent(srchID)}?${filters}`)
                        .then((response) => resolve(response))
                        .catch((response) => reject(response));
                }, (__LOCAL_DEV__) ? 1000 : 0 );
            }).then(function (response) {
                return {data: [response.data]};
            })
                .catch(function (response) {
                    if (__LOCAL_DEV__) {
                        console.log('Running in DEV mode and using fake data');
                        return {data: fakeData.searchResults};
                    }
                    return Promise.reject(response);
                })
    };
}

export function toggleResultItem(itemCode) {
  return {
    type: types.TOGGLE_RESULT_ITEM,
    itemCode
  };
}

export function replaceCurrentCU(itemCode) {
  return {
    type: types.REPLACE_CURRENT_CU,
    itemCode
  };
}

export function setEmploymentStatus(value) {
  return {
    type: types.REPLACE_EMP_STATUS,
    value
  };
}

export function setBusinessActivityDescription(value) {
  return {
    type: types.SET_BUSINESS_ACTIVITY_DESCRIPTION,
    value
  };
}

/*
 * Creates a new random correlation id (8 character alphanumeric)
 */
function createCorrelationId() {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function getUrlParameter(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
