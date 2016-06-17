
import * as types from '../actions/ActionTypes';
import * as errors from './Errors';

// APP REDUCER
export function _app(state = {}, action = {}) {
  let newState = {...state };

  switch(action.type) {
    case types.PAGE_HEADER: {
      newState.pageHeader = action.content;
      return newState;
    }
    case types.SWITCH_PANEL: {
      newState.panelActive = !newState.panelActive;
      newState.refresh = !newState.refresh;
      return newState;
    }
    case types.PANEL_CONTENT: {
      newState.panelContent = action.content;
      return newState;
    }
    case types.CLEAR_REGISTRATION_ERROR: {
      newState.registrationError = undefined;
      return newState;
    }
    case types.SET_REG_CODE_VALUE: {
      newState.register.regCodeValue = action.value;
      return newState;
    }
    case types.SET_IRD_NUMBER_VALUE: {
      newState.register.irdNumberValue = action.value;
      return newState;
    }
    case types.SET_EMAIL_VALUE: {
      newState.register.emailValue = action.value;
      return newState;
    }
    case types.LOGOUT_PENDING: {
      newState.loggingOut = true;
      newState.spinner = true;
      return newState;
    }
    case types.LOGOUT_FULFILLED: {
      newState.loggingOut = false;
      newState.loggedIn = false;
      newState.spinner = false;
      return newState;
    }
    case types.LOGOUT_REJECTED: {
      newState.loggingOut = false;
      newState.spinner = false;
      // TODO show an error page because we can't guarantee that any previous user session has been closed
      return newState;
    }
    case types.REGISTER_PENDING: {
      newState.registering = true;
      newState.spinner = true;
      return newState;
    }
    case types.REGISTER_FULFILLED: {
      newState.registering = false;
      // TODO store data returned from service? is there any point since we're about to redirect?
      newState.registrationError = undefined;
      newState.sorryError = undefined;
      return newState;
    }
    case types.REGISTER_REJECTED: {
      if (action.payload === errors.REG_CODE_IRD_NUMBER_MISMATCH || action.payload === errors.DUPLICATE_EMAIL) {
        newState.registrationError = errors.errorMessage(action.payload); 
      } else {
        newState.sorryError = errors.errorMessage(action.payload);
      }
      newState.registering = false;
      newState.spinner = false;
      return newState;
    }
    case types.FETCH_PARTIES_PENDING: {
      newState.loggedIn = true;
      newState.fetchingParties = true;
      newState.spinner = true;
      return newState;
    }
    case types.FETCH_PARTIES_FULFILLED: {
      newState.accountNumber = action.payload.data;
      newState.fetchingParties = false;
      return newState;
    }
    case types.FETCH_PARTIES_REJECTED: {
      newState.fetchingParties = false;
      newState.loggedIn = false;
      newState.spinner = false;
      return newState;
    }
    case types.FETCH_ACCOUNT_PENDING: {
      newState.fetchingAccount = true;
      return newState;
    }
    case types.FETCH_ACCOUNT_FULFILLED: {
      newState.accNumber = newState.accountNumber + action.payload.data.customer.accountList[0].accSuffix;
      newState.accountName = action.payload.data.customer.accountList[0].accountName;
      newState.taxYear = action.payload.data.customer.accountList[0].classificationsList[0].levyYear;
      newState.employmentStatus = action.payload.data.customer.accountList[0].fmuCode;
      newState.levyClassification.code = action.payload.data.customer.accountList[0].classificationsList[0].classificationUnitCode;
      newState.levyClassification.description = action.payload.data.customer.accountList[0].classificationsList[0].classificationUnitDescription;
      newState.fetchingAccount = false;
      newState.bicHost = action.payload.data.bicHost;
      newState.spinner = false;
      newState.customer = action.payload.data.customer;
      return newState;
    }
    case types.FETCH_ACCOUNT_REJECTED: {
      newState.fetchingAccount = false;
      newState.loggedIn = false;
      newState.spinner = false;
      return newState;
    }
    case types.SEARCH_CU_PENDING: {
      newState.levySearch.searching = true;
      return newState;
    }
    case types.SEARCH_CU_FULFILLED: {
      // Parse data to remove unwanted "other codes" e.g. "browse" ones
      let temp = action.payload.data;
      for (var bic in temp) {
        let bicData = temp[bic];
        for (var ref = bicData.bicrefs.length - 1; ref >= 0; ref--) {
          if (bicData.bicrefs[ref].refs) {
            if (bicData.bicrefs[ref].refs[0].type !== 'bic') {
              temp[bic].bicrefs.splice(ref, 1);
            }
          }
        }
      }

      newState.levySearch.searchResults = temp;
      newState.levySearch.searching = false;
      return newState;
    }
    case types.SEARCH_CU_REJECTED: {
      newState.levySearch.searching = false;
      return newState;
    }
    case types.SET_SEARCH_CU_VALUE: {
      newState.levySearch.searchCUValue = action.value;
      return newState;
    }
    case types.REPLACE_CURRENT_CU: {
      const results = newState.levySearch.searchResults;
      const idxItem = results.findIndex(item => item.cu.code === action.itemCode);
      const item = results[idxItem];
      newState.levyClassification.code = item.cu.code;
      newState.levyClassification.description = item.cu.desc;
      newState.customer.accountList[0].classificationsList[0].classificationUnitCode = item.cu.code;
      newState.customer.accountList[0].classificationsList[0].classificationUnitDescription = item.cu.desc;
      newState.cuChanged = true;
      return newState;
    }
    case types.REPLACE_EMP_STATUS: {
      newState.employmentStatus = action.value;
      newState.customer.accountList[0].fmuCode = action.value;
      return newState;
    }
    case types.SET_BUSINESS_ACTIVITY_DESCRIPTION: {
      newState.customer.accountList[0].classificationsList[0].businessActivityDescription = action.value;
      return newState;
    }
    case types.CONFIRM_DETAILS_PENDING: {
      newState.confirmingCoverDetails = true;
      return newState;
    }
    case types.CONFIRM_DETAILS_FULFILLED: {
      newState.confirmingCoverDetails = false;
      newState.confirmCoverDetailsSuccess = true;
      return newState;
    }
    case types.CONFIRM_DETAILS_REJECTED: {
      newState.confirmingCoverDetails = false;
      newState.confirmCoverDetailsSuccess = false;
      return newState;
    }
    case types.TOGGLE_RESULT_ITEM: {
      const results = newState.levySearch.searchResults;
      const idxItem = results.findIndex(item => item.code === action.itemCode);
      const item = results[idxItem];
      item.expanded = !item.expanded;
      newState.refresh = !newState.refresh;
      return newState;
    }
    default: {
      return state;
    }
  }
}
