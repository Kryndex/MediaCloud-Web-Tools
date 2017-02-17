import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Title from 'react-title-component';
import { FormattedMessage, injectIntl } from 'react-intl';
import LoginForm from './LoginForm';

const localMessages = {
  loginTitle: { id: 'login.title', defaultMessage: 'Login' },
};

class LoginContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.context.router.push('/home');
    }
  }
  render() {
    const { formatMessage, isLoggedIn } = this.props.intl;
    const titleHandler = parentTitle => `${formatMessage(localMessages.loginTitle)} | ${parentTitle}`;
    const className = `logged-in-${isLoggedIn}`;
    return (
      <Grid>
        <Title render={titleHandler} />
        <Row>
          <Col lg={12} md={12} sm={12} className={className}>
            <h2><FormattedMessage {...localMessages.loginTitle} /></h2>
          </Col>
        </Row>
        <LoginForm location={this.props.location} />
      </Grid>
    );
  }
}

LoginContainer.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  intl: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
};

LoginContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default
  injectIntl(
    connect(mapStateToProps)(
      LoginContainer
    )
  );
