import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import TeacherView from './teacher/TeacherView';
import StudentView from './student/StudentView';
import './App.css';
import {
  getApiEndpoint,
  getSettings,
} from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE } from '../config/settings';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    dispatchGetApiEndpoint: PropTypes.func.isRequired,
    dispatchGetSettings: PropTypes.func.isRequired,
    lang: PropTypes.string,
    mode: PropTypes.string,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
  };

  constructor(props) {
    super(props);
    props.dispatchGetApiEndpoint();
    props.dispatchGetSettings();
  }

  componentDidMount() {
    const { lang } = this.props;
    this.handleChangeLang(lang);
  }

  componentDidUpdate({ lang: prevLang }) {
    const { lang } = this.props;
    if (prevLang !== lang) {
      this.handleChangeLang(lang);
    }
  }

  handleChangeLang = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode } = this.props;

    switch (mode) {
      // show teacher view when in teacher mode
      case 'teacher':
        return <TeacherView />;

      // by default go with the student mode
      case 'student':
      default:
        return <StudentView />;
    }
  }
}

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang,
  mode: settings.mode,
});

const mapDispatchToProps = {
  dispatchGetApiEndpoint: getApiEndpoint,
  dispatchGetSettings: getSettings,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withNamespaces('translations')(ConnectedApp);
