import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Container,
  Button,
  Table,
  ButtonGroup,
} from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import './TeacherView.css';
import {
  patchAppInstanceResource,
  postAppInstanceResource,
  deleteAppInstanceResource,
} from '../../../actions';

/**
 * helper method to render the rows of the app instance resource table
 * @param appInstanceResources
 * @param dispatchPatchAppInstanceResource
 * @param dispatchDeleteAppInstanceResource
 * @returns {*}
 */
const renderAppInstanceResources = (
  appInstanceResources,
  {
    dispatchPatchAppInstanceResource,
    dispatchDeleteAppInstanceResource,
  },
) => {
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return <tr><td colSpan={4}>No App Instance Resources</td></tr>;
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, appInstance, data }) => (
    <tr key={_id}>
      <th scope="row">{ _id }</th>
      <td>{ appInstance }</td>
      <td>{ data.value }</td>
      <td>
        <ButtonGroup>
          <Button
            size="sm"
            color="warning"
            onClick={() => dispatchPatchAppInstanceResource({
              id: _id,
              data: { value: Math.random() },
            })}
          >
            Change
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => dispatchDeleteAppInstanceResource(_id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
};

const generateRandomAppInstanceResource = ({ dispatchPostAppInstanceResource }) => {
  dispatchPostAppInstanceResource({
    data: { value: Math.random() },
  });
};

export const TeacherView = (props) => {
  // extract properties from the props object
  const {
    // this property allow us to do translations and is injected by i18next
    t,
    // this property is injected by the redux mapStateToProps method
    appInstanceResources,
  } = props;
  return (
    <Container fluid className="App App-body TeacherView">
      <Alert color="primary">
        {
          t('This is the teacher view. Switch to the student view by clicking on the URL below.')
        }
        <a href="?mode=student">
          <pre>{`${window.location.host}/?mode=student`}</pre>
        </a>
      </Alert>
      <h5>
        This table illustrates how an app can save resources on the server.
      </h5>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>App Instance</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { renderAppInstanceResources(appInstanceResources, props) }
        </tbody>
      </Table>
      <Button
        color="primary"
        onClick={() => generateRandomAppInstanceResource(props)}
      >
        Save a Random App Instance Resource via the API
      </Button>
    </Container>
  );
};

TeacherView.propTypes = {
  t: PropTypes.func.isRequired,
  // inside the shape method you should put the shape
  // that the resources your app uses will have
  appInstanceResources: PropTypes.arrayOf(PropTypes.shape({
    // we need to specify number to avoid warnings with local server
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    appInstanceId: PropTypes.string,
    data: PropTypes.object,
  })),
};

TeacherView.defaultProps = {
  appInstanceResources: [],
};

// get the app instance resources that are saved in the redux store
const mapStateToProps = state => ({
  appInstanceResources: state.appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPatchAppInstanceResource: patchAppInstanceResource,
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TeacherView);

export default withNamespaces('translations')(ConnectedComponent);
