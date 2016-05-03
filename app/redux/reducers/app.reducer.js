
const initialState = {
  panelActive: false,
  loggedIn: false,
  taxYear: '1 April 2015 to 31 March 2016',
  panelContent: 'ACCCover',
  employementStatus: [
    'Full time (more than 30 hours/week)',
    'Part time (30 hours or less/week)'
  ],
  levyClassification: '772000 - Real estate services'
};


// APP REDUCER
export function _app(state = initialState, action = {}) {
  let newState = {...state };

  switch(action.type) {
    case 'SWITCH_PANEL':
      newState.panelActive = !newState.panelActive;
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
    default:
      return state;
  }
}
