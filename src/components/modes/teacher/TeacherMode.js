import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';
import { getActions, getAppInstanceResources } from '../../../actions';
import Loader from '../../common/Loader';

class TeacherMode extends Component {
  static propTypes = {
    appInstanceId: PropTypes.string,
    view: PropTypes.string,
    activity: PropTypes.bool,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    dispatchGetActions: PropTypes.func.isRequired,
  };

  static defaultProps = {
    view: 'normal',
    appInstanceId: null,
    activity: false,
  };

  componentDidMount() {
    const { dispatchGetAppInstanceResources, dispatchGetActions } = this.props;

    // get all of the resources and actions
    dispatchGetAppInstanceResources();
    dispatchGetActions();
  }

  componentDidUpdate({ appInstanceId: prevAppInstanceId }) {
    const { appInstanceId, dispatchGetAppInstanceResources } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstanceResources();
    }
  }

  render() {
    const { view, activity } = this.props;
    if (activity) {
      return <Loader />;
    }
    switch (view) {
      case DASHBOARD_VIEW:
      case DEFAULT_VIEW:
      default:
        return <TeacherView />;
    }
  }
}
const mapStateToProps = ({ context, appInstanceResources }) => ({
  appInstanceId: context.appInstanceId,
  activity: Boolean(appInstanceResources.activity.length),
});

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetActions: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherMode);

export default ConnectedComponent;
