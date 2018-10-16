import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import Select from 'react-select';
import { options } from '../constants/langs';
import Logo from '../logo.svg';
import './Header.css';

class Header extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    selectedLanguage: options[0],
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
    this.setState({
      selectedLanguage,
    });
    i18n.changeLanguage(value);
  };

  render() {
    const { selectedLanguage } = this.state;
    const { t } = this.props;
    return (
      <header className="App-header">
        <Row>
          <Col>
            <Select
              styles={this.colorStyles}
              className="LanguageSelector"
              defaultValue={options[0]}
              options={options}
              value={selectedLanguage}
              onChange={this.changeLanguage}
            />
          </Col>
        </Row>
        <img src={Logo} className="App-logo" alt="Logo" />
        <h1 className="App-title">{t('Welcome to the Graasp App Starter Kit')}</h1>
      </header>
    );
  }
}

export default withNamespaces('translations')(Header);
