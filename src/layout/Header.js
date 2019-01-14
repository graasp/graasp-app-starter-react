import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import Select from 'react-select';
import { options as langOptions } from '../constants/langs';
import { ReactComponent as Logo } from '../resources/logo.svg';
import './Header.css';

class Header extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  };

  colorStyles = {
    option: styles => ({
      ...styles,
      color: 'black',
    }),
  };

  changeLanguage = (selectedLanguage) => {
    const { i18n } = this.props;
    const { value } = selectedLanguage;
    i18n.changeLanguage(value);
  };

  render() {
    const { t, lang } = this.props;
    const selectedLanguage = langOptions.find(langOption => langOption.value === lang);
    return (
      <header className="App-header">
        <Row>
          <Col>
            <Select
              styles={this.colorStyles}
              className="LanguageSelector"
              // default selected value is the first language option
              defaultValue={langOptions[0]}
              options={langOptions}
              value={selectedLanguage}
              onChange={this.changeLanguage}
            />
          </Col>
        </Row>
        <Logo className="App-logo" />
        <h1 className="App-title">{t('Welcome to the Graasp App Starter Kit')}</h1>
      </header>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang,
});

const ConnectedHeader = connect(mapStateToProps)(Header);

export default withNamespaces('translations')(ConnectedHeader);
