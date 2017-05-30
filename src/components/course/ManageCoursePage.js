import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import * as authorActions from '../../actions/authorActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { 
      course: Object.assign({}, props.initialCourse),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialCourse.id != nextProps.initialCourse.id) {
      this.setState({course: Object.assign({}, nextProps.initialCourse)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course Saved!');
    this.context.router.push('/courses');
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error("Save Failed: " + error);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <CourseForm course={this.state.course}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse} 
        saving={this.state.saving} />
    );
  }
}

ManageCoursePage.propTypes = {
  initialCourse : PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  const course = courses.filter(c => c.id === courseId);
  if (course.length) { return course[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id; // from /course/<id>
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  if (courseId && state.courses.length) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormatedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + " " + author.lastName
    };
  });

  return {
    initialCourse: course,
    authors: authorsFormatedForDropDown
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);