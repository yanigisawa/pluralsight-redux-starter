import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses, // short-hand property name ES6
  authors
});

export default rootReducer;