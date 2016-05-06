
const initialState = {
  refresh: false,
  panelActive: false,
  loggedIn: false,
  taxYear: '1 April 2015 to 31 March 2016',
  panelContent: 'ACCCover',
  employementStatus: [
    'Full time (more than 30 hours/week)',
    'Part time (30 hours or less/week)'
  ],
  code: '772000',
  levyClassification: {
    code: '772000',
    title: 'Real estate services 0'
  },
  levySearch: {
    searching: false,
    searchCUValue: '',
    searchResults: []
  }
};

// APP REDUCER
export function _app(state = initialState, action = {}) {
  let newState = {...state };

  switch(action.type) {
    case 'SWITCH_PANEL':
      newState.panelActive = !newState.panelActive;
      newState.refresh = !newState.refresh;
      return newState;
    case 'PANEL_CONTENT':
      newState.panelContent = action.content;
      return newState;
    case 'MASK_PANEL_CLICK':
      newState.panelActive = !newState.panelActive;
      return newState;
    case 'LOGGED_IN':
      newState.loggedIn = action.state;
      return newState;
    case 'SEARCH_CU_PENDING': {
        newState.levySearch.searching = true;
        return newState;
      }
    case 'SEARCH_CU_FULFILLED': {
        newState.levySearch.searchResults = action.payload.data;
        newState.levySearch.searching = false;
        return newState;
      }
    case 'SEARCH_CU_REJECTED': {
        newState.levySearch.searching = false;
        return newState;
      }
    case 'SET_SEARCH_CU_VALUE':
      newState.levySearch.searchCUValue = action.value;
      return newState;
    case 'SET_CURRENT_CU': {
        const results = newState.levySearch.searchResults;
        const idxItem = results.findIndex(item => item.CU.code === action.code);
        const item = results[idxItem];
        newState.levyClassification.code = item.CU.code;
        newState.levyClassification.title = item.CU.title;
        return newState;
      }
    case 'TOOGLE_RESULT_ITEM': {
        const results = newState.levySearch.searchResults;
        const idxItem = results.findIndex(item => item.CU.code === action.code);
        const item = results[idxItem];
        item.expanded = !item.expanded;
        newState.refresh = !newState.refresh;
        return newState;
      }
    default:
      return state;
  }
}
