import { expect } from 'chai';

import {_app} from './app.reducer';
import * as types from '../actions/ActionTypes';

// TODO add tests for REGISTER

describe('reducer', () => {
  
  it('should set the page header', () => {
    expect(_app({}, {
      type: types.PAGE_HEADER,
      content : 'my header'
    })).to.deep.equal({
      pageHeader: 'my header'
    });
  });
  
  it('should activate the right panel', () => {
    expect(_app({}, {
      type: types.SWITCH_PANEL
    })).to.deep.equal({
      panelActive: true,
      refresh: true
    });
  });
  
  it('should deactivate the right panel', () => {
    expect(_app({
      panelActive: true,
    }, {
      type: types.SWITCH_PANEL
    })).to.deep.equal({
      panelActive: false,
      refresh: true
    });
  });
  
  it('should set the content in the panel', () => {
    expect(_app({}, {
      type: types.PANEL_CONTENT,
      content : 'my content'
    })).to.deep.equal({
      panelContent: 'my content'
    });
  });
  
  it('should clear the registration error', () => {
    expect(_app({}, {
      type: types.CLEAR_REGISTRATION_ERROR
    })).to.deep.equal({
      registrationError: undefined
    });
  });
  
  it('should begin logging out', () => {
    expect(_app({}, {
      type: types.LOGOUT_PENDING
    })).to.deep.equal({
      loggingOut: true,
      spinner: true
    });
  });
  
  it('should handle a successful logout', () => {
    expect(_app({}, {
      type: types.LOGOUT_FULFILLED,
      payload: {
      }
    })).to.deep.equal({
      loggingOut: false,
      loggedIn: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful logout', () => {
    expect(_app({}, {
      type: types.LOGOUT_REJECTED
    })).to.deep.equal({
      loggingOut: false,
      spinner: false
    });
  });
  
  it('should begin registering', () => {
    expect(_app({}, {
      type: types.REGISTER_PENDING
    })).to.deep.equal({
      registering: true,
      spinner: true
    });
  });
  
  it('should handle a successful registration', () => {
    expect(_app({}, {
      type: types.REGISTER_FULFILLED,
      payload: {
      }
    })).to.deep.equal({
      registrationError: undefined,
      sorryError: undefined,
      registering: false
    });
  });
  
  it('should handle an unsuccessful registration due to registration code / IRD number mismatch', () => {
    expect(_app({}, {
      type: types.REGISTER_REJECTED,
      payload: 'REG_CODE_IRD_NUMBER_MISMATCH'
    })).to.deep.equal({
      registrationError: 'Your ACC access code or IRD number was not recognised, please check and try again.',
      registering: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful registration due to registration code used', () => {
    expect(_app({}, {
      type: types.REGISTER_REJECTED,
      payload: 'REG_CODE_USED'
    })).to.deep.equal({
      sorryError: 'The access code you entered has been used.',
      registering: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful registration due to registration code expired', () => {
    expect(_app({}, {
      type: types.REGISTER_REJECTED,
      payload: 'REG_CODE_EXPIRED'
    })).to.deep.equal({
      sorryError: 'The access code you entered has expired.',
      registering: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful registration due to duplicate email address', () => {
    expect(_app({}, {
      type: types.REGISTER_REJECTED,
      payload: 'DUPLICATE_EMAIL'
    })).to.deep.equal({
      registrationError: 'Sorry, this email address is already registered.',
      registering: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful registration due to an unexpected service failure', () => {
    expect(_app({}, {
      type: types.REGISTER_REJECTED
    })).to.deep.equal({
      sorryError: 'If you\'re reading this message then something has gone horribly horribly wrong.',
      registering: false,
      spinner: false
    });
  });
  
  it('should begin fetching parties', () => {
    expect(_app({}, {
      type: types.FETCH_PARTIES_PENDING
    })).to.deep.equal({
      loggedIn: true,
      fetchingParties: true,
      spinner: true
    });
  });
  
  it('should handle a successful fetch of parties', () => {
    expect(_app({}, {
      type: types.FETCH_PARTIES_FULFILLED,
      payload: {
        data: 'A1234567'
      }
    })).to.deep.equal({
      accountNumber: 'A1234567',
      fetchingParties: false
    });
  });
  
  it('should handle an unsuccessful fetch of parties', () => {
    expect(_app({}, {
      type: types.FETCH_PARTIES_REJECTED
    })).to.deep.equal({
      loggedIn: false,
      fetchingParties: false,
      spinner: false
    });
  });
  
  it('should begin fetching an account', () => {
    expect(_app({}, {
      type: types.FETCH_ACCOUNT_PENDING
    })).to.deep.equal({
      fetchingAccount: true
    });
  });
  
  it('should handle a successful fetch of an account', () => {
    expect(_app({
      accountNumber: 'A1234567',
        levyClassification: {}
    }, {
      type: types.FETCH_ACCOUNT_FULFILLED,
      payload: {
        data: {
          customer: {
            accountList: [{
              accSuffix: 'S',
              accountName: 'my name',
              fmuCode: 'F',
              classificationsList: [{
                levyYear: '1 April 2015 - 31 March 2016',
                classificationUnitCode: 'my code',
                classificationUnitDescription: 'my description'
              }]
            }]
          },
          bicHost: 'my host'
        }
      }
    })).to.deep.equal({
      accountNumber: 'A1234567',
      accNumber: 'A1234567S',
      accountName: 'my name',
      taxYear: '1 April 2015 - 31 March 2016',
      employmentStatus: 'F',
      levyClassification: {
        code: 'my code',
        description: 'my description'
      },
      bicHost: 'my host',
      fetchingAccount: false,
      customer: {
        accountList: [{
          accSuffix: 'S',
          accountName: 'my name',
          fmuCode: 'F',
          classificationsList: [{
            levyYear: '1 April 2015 - 31 March 2016',
            classificationUnitCode: 'my code',
            classificationUnitDescription: 'my description'
          }]
        }]
      },
      fetchingAccount: false,
      spinner: false
    });
  });
  
  it('should handle an unsuccessful fetch of an account', () => {
    expect(_app({}, {
      type: types.FETCH_ACCOUNT_REJECTED
    })).to.deep.equal({
      loggedIn: false,
      fetchingAccount: false,
      spinner: false
    });
  });
  
  it('should begin searching for a CU', () => {
    expect(_app({
      levySearch: {}
    }, {
      type: types.SEARCH_CU_PENDING
    })).to.deep.equal({
      levySearch: {
        searching: true
      }
    });
  });
  
  it('should handle a successful CU search', () => {
    let searchData = [{
      code: "M700010",
      desc: "Computer consultancy service",
      bicrefs: [{
        desc: "Installing or maintaining computer cables within buildings use #$0",
        order: 0,
        refs: [{
          id: "555c7ba77aaceec91e3f2875",
          type: "bic",
          desc: "E323210 Computer cable installation (within buildings)"
        }]
      },
        {
          desc: "Wholesaling computers, computer software or peripherals browse #$0 and select the most relevant code from there",
          order: 1,
          refs: [{
            id: "555bc5e225a9732ca20a1086",
            type: "Class",
            desc: "Computer and computer peripherals wholesaling"
          }]
        },
        {
          desc: "Installing or maintaining bunnies within buildings use #$0",
          order: 0,
          refs: [{
            id: "555c7ba77aaceec91e3f2875",
            type: "bic",
            desc: "E323210 Bunny installation (within buildings)"
          }]
        }]
    }];

    let resultData = [{
      code: "M700010",
      desc: "Computer consultancy service",
      bicrefs: [{
        desc: "Installing or maintaining computer cables within buildings use #$0",
        order: 0,
        refs: [{
          id: "555c7ba77aaceec91e3f2875",
          type: "bic",
          desc: "E323210 Computer cable installation (within buildings)"
        }]
      },
        {
          desc: "Installing or maintaining bunnies within buildings use #$0",
          order: 0,
          refs: [{
            id: "555c7ba77aaceec91e3f2875",
            type: "bic",
            desc: "E323210 Bunny installation (within buildings)"
          }]
        }]
    }];

    expect(_app({
      levySearch: {}
    }, {
      type: types.SEARCH_CU_FULFILLED,
      payload: {
        data: searchData
      }
    })).to.deep.equal({
      levySearch: {
        searchResults: resultData,
        searching: false
      }
    });
  });
  
  it('should handle an unsuccessful CU search', () => {
    expect(_app({
      levySearch: {}
    }, {
      type: types.SEARCH_CU_REJECTED
    })).to.deep.equal({
      levySearch: {
        searching: false
      }
    });
  });
  
  it('should begin confirming user cover details', () => {
    expect(_app({}, {
      type: types.CONFIRM_DETAILS_PENDING
    })).to.deep.equal({
      confirmingCoverDetails: true
    });
  });

  it('should handle confirming user cover details success', () => {
    expect(_app({}, {
      type: types.CONFIRM_DETAILS_FULFILLED
    })).to.deep.equal({
      confirmingCoverDetails: false,
      confirmCoverDetailsSuccess: true
    });
  });

  it('should handle comfirm cover details failure', () => {
    expect(_app({}, {
      type: types.CONFIRM_DETAILS_REJECTED
    })).to.deep.equal({
      confirmingCoverDetails: false,
      confirmCoverDetailsSuccess: false
    });
  });

  it('should handle replacing employer status (fmu code)', () => {
    expect(_app({
      customer: {
        accountList: [{}]
      }
    }, {
      type: types.REPLACE_EMP_STATUS,
      value: 'F'
    })).to.deep.equal({
      employmentStatus: 'F',
      customer: {
        accountList: [{
          fmuCode: 'F'
        }]
      }
    });
  });

  it('should handle replacing current cu code', () => {
    expect(_app({
      customer: {
        accountList: [{
          classificationsList: [
            {
              classificationUnitCode: "57200",
              classificationUnitDescription: "Pubs, taverns, and bars"
            }
          ]
        }]
      },
      levyClassification: {
        code: undefined,
        description: undefined
      },
      levySearch: {
        searchResults: [
          {
            cu: {
              code: '77110',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          },
          {
            cu: {
              code: '77111',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          },
          {
            cu: {
              code: '77112',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          }
        ]
      }
    }, {
      type: types.REPLACE_CURRENT_CU,
      itemCode: '77112'
    })).to.deep.equal({
      customer: {
        accountList: [{
          classificationsList: [
            {
              classificationUnitCode: "77112",
              classificationUnitDescription: "Residential property operators and developers (excluding construction)"
            }
          ]
        }]
      },
      levyClassification: {
        code: '77112',
        description: 'Residential property operators and developers (excluding construction)'
      },
      levySearch: {
        searchResults: [
          {
            cu: {
              code: '77110',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          },
          {
            cu: {
              code: '77111',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          },
          {
            cu: {
              code: '77112',
              desc: 'Residential property operators and developers (excluding construction)'
            }
          }
        ]
      },
      cuChanged : true
    });
  });
  
  it('should handle setting the business activity description', () => {
    expect(_app({
      customer: {
        accountList: [{
          classificationsList: [{}]
        }]
      }
    }, {
      type: types.SET_BUSINESS_ACTIVITY_DESCRIPTION,
      value: 'I farm cows'
    })).to.deep.equal({
      customer: {
        accountList: [{
          classificationsList: [
            {
              businessActivityDescription: 'I farm cows'
            }
          ]
        }]
      }
    });
  });

});
