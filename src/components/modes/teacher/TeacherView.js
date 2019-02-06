import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Container, Button, Table, ButtonGroup } from 'reactstrap';
import Select from 'react-select';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './TeacherView.css';
import {
  patchAppInstanceResource,
  postAppInstanceResource,
  deleteAppInstanceResource,
} from '../../../actions';
import { getUsers } from '../../../actions/users';

/**
 * helper method to render the rows of the app instance resource table
 * @param appInstanceResources
 * @param dispatchPatchAppInstanceResource
 * @param dispatchDeleteAppInstanceResource
 * @returns {*}
 */
const renderAppInstanceResources = (
  appInstanceResources,
  { dispatchPatchAppInstanceResource, dispatchDeleteAppInstanceResource }
) => {
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return (
      <tr>
        <td colSpan={4}>No App Instance Resources</td>
      </tr>
    );
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, appInstance, data }) => (
    <tr key={_id}>
      <th scope="row">{_id}</th>
      <td>{appInstance}</td>
      <td>{data.value}</td>
      <td>
        <ButtonGroup>
          <Button
            size="sm"
            color="warning"
            onClick={() =>
              dispatchPatchAppInstanceResource({
                id: _id,
                data: { value: Math.random() },
              })
            }
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

const generateRandomAppInstanceResource = ({
  dispatchPostAppInstanceResource,
}) => {
  dispatchPostAppInstanceResource({
    data: { value: Math.random() },
  });
};

export class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchGetUsers: PropTypes.func.isRequired,
    // inside the shape method you should put the shape
    // that the resources your app uses will have
    appInstanceResources: PropTypes.arrayOf(
      PropTypes.shape({
        // we need to specify number to avoid warnings with local server
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        appInstanceId: PropTypes.string,
        data: PropTypes.object,
      })
    ),
    // this is the shape of the select options for students
    studentOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ).isRequired,
  };

  state = {
    selectedStudent: null,
  };

  constructor(props) {
    super(props);
    const { dispatchGetUsers } = this.props;
    dispatchGetUsers();
  }

  handleChangeStudent = value => {
    this.setState({
      selectedStudent: value,
    });
  };

  render() {
    // extract properties from the props object
    const {
      // this property allow us to do translations and is injected by i18next
      t,
      // these properties are injected by the redux mapStateToProps method
      appInstanceResources,
      studentOptions,
    } = this.props;
    const { selectedStudent } = this.state;
    return (
      <Container fluid className="App App-body TeacherView">
        <Alert color="primary">
          {t(
            'This is the teacher view. Switch to the student view by clicking on the URL below.'
          )}
          <a href="?mode=student">
            <pre>{`${window.location.host}/?mode=student`}</pre>
          </a>
        </Alert>
        <h5>View the Students in the Sample Space</h5>
        <Select
          className="StudentSelect"
          value={selectedStudent}
          options={studentOptions}
          onChange={this.handleChangeStudent}
          isClearable
        />
        <hr />
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
            {renderAppInstanceResources(appInstanceResources, this.props)}
          </tbody>
        </Table>
        <Button
          color="primary"
          onClick={() => generateRandomAppInstanceResource(this.props)}
        >
          Save a Random App Instance Resource via the API
        </Button>
      </Container>
    );
  }
}

TeacherView.defaultProps = {
  appInstanceResources: [],
};

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ users, appInstanceResources }) => ({
  // we transform the list of students in the database
  // to the shape needed by the select component
  studentOptions: users.content.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
  appInstanceResources: appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetUsers: getUsers,
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPatchAppInstanceResource: patchAppInstanceResource,
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherView);

export default withTranslation()(ConnectedComponent);
