import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class ManageCourses extends React.Component
  constructor(props, context) {
    super(props, context);

  render() {
    return (
    );
  }
}

ManageCourses.propTypes = {
  // myProp: PropTypes.string.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    state: state
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ManageCourses)