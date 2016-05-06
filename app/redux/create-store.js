
import { createStore, applyMiddleware,} from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers/index';

const loggerOptions = {
  level: 'log', // 'log', | 'console' | 'warn' | 'error' | 'info', // console's level
  duration: true, //: Boolean, // Print the duration of each action?
  timestamp: true, //: Boolean, // Print the timestamp with each action?
  colors: { // Object with color getters. See the ColorsObject interface.
    title: action => 'green'
  },
  logger: console, //: LoggerObject, // Implementation of the `console` API.
  logErrors: true, //: Boolean, // Should the logger catch, log, and re-throw errors?
  collapsed: false // Takes a boolean or optionally a function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
  // predicate: null, // If specified this function will be called before each action is processed with this middleware.
  // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
  // actionTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
  // errorTransformer // Transform state before print. Eg. convert Immutable object to plain JSON.
};

const logger = createLogger(loggerOptions);
const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware(), logger)
);

export default store;
