/**
 * Created by jr1500 on 7/11/15.
 */

import { combineReducers } from 'redux';
import { _app } from './app.reducer';
import { _mainpage } from './mainpage.reducer';

export default combineReducers({
  _app, _mainpage
});
