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


import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as appActions from '../../redux/actions/app.actions';

// SASS Stylesheets
import './app.scss';

import Header from '../Header';
import Login from '../Login';
import CoverDetails from '../CoverDetails';
import Footer from '../Footer';
import Panel from '../Panel';
import ACCCover from '../ACCCover';
import TermsOfUse from '../TermsOfUse';

function mapStateToProps(state) {
  return {
    PanelActive: state._app.panelActive,
    LoggedIn: state._app.loggedIn,
    PanelContent: state._app.panelContent,
    EmployementStatus: state._app.employementStatus,
    LevyClassification: state._app.levyClassification,
    TaxYear: state._app.taxYear
  };
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div  className="main-content">
          <div className="container">
            {
              this.props.LoggedIn ?
                  <CoverDetails {...this.props} />
                :
                  <Login {...this.props} />
            }
          </div>
          <Panel className="panel--slide-right" {...this.props} >
            {
              panelContent(this.props.PanelContent)
            }
          </Panel>
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

const panelContent = (content) => {
  switch(content) {
    case 'ACCCover':
      return(<ACCCover />);
      break;
    case 'TermsOfUse':
      return(<TermsOfUse />);
      break;
  }
};


export default connect(
    mapStateToProps, {
    ...appActions
  }
)(App);
