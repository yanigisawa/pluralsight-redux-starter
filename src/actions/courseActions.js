import * as types from './actionTypes.js';
import courseApi from '../api/mockCourseApi';


export function loadCoursesSucess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSucess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}