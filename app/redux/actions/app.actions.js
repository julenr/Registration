
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
