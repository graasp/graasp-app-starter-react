import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Select from 'react-select';
import { options as langOptions } from '../../constants/langs';
import { ReactComponent as Logo } from '../../resources/logo.svg';
import './Header.css';
import { addQueryParamsToUrl } from '../../utils/url';

class Header extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    appInstanceId: PropTypes.string,
    spaceId: PropTypes.string,
  };

  static defaultProps = {
    appInstanceId: null,
    spaceId: null,
  };

  changeLanguage = selectedLanguage => {
    const { i18n } = this.props;
    const { value } = selectedLanguage;
    i18n.changeLanguage(value);
  };

  renderAppInstanceLink = () => {
    const { appInstanceId } = this.props;
    if (!appInstanceId) {
      return (
        <a
          href={addQueryParamsToUrl({
            appInstanceId: '6156e70ab253020033364411',
          })}
          className="HeaderLink"
        >
          Use Sample App Instance
        </a>
      );
    }
    return <div />;
  };

  renderSpaceLink = () => {
    const { spaceId } = this.props;
    if (!spaceId) {
      return (
        <a
          href={addQueryParamsToUrl({ spaceId: '5b56e70ab253020033364411' })}
          className="HeaderLink"
        >
          Use Sample Space
        </a>
      );
    }
    return <div />;
  };

  render() {
    const { t, lang } = this.props;
    const selectedLanguage = langOptions.find(
      langOption => langOption.value === lang
    );
    return (
      <header className="App-header">
        <Row>
          <Col>
            {this.renderSpaceLink()}
            {this.renderAppInstanceLink()}
          </Col>
          <Col>
            <Select
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
        <h1 className="App-title">
          {t('Welcome to the Graasp App Starter Kit')}
        </h1>
      </header>
    );
  }
}

const mapStateToProps = ({ context }) => ({
  lang: context.lang,
  spaceId: context.spaceId,
  appInstanceId: context.appInstanceId,
});

const ConnectedHeader = connect(mapStateToProps)(Header);

export default withTranslation()(ConnectedHeader);
