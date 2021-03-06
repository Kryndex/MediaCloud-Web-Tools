import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import FeaturedCollectionsContainer from './FeaturedCollectionsContainer';
import PopularCollectionsContainer from './PopularCollectionsContainer';
import FavoriteSourcesAndCollectionsContainer from './FavoriteSourcesAndCollectionsContainer';
import DescriptiveButton from '../../common/DescriptiveButton';
import DataCard from '../../common/DataCard';
import LoginForm from '../../user/LoginForm';
import { assetUrl } from '../../../lib/assetUtil';

const localMessages = {
  title: { id: 'sources.intro.title', defaultMessage: 'Explore our Sources and Collections' },
  about: { id: 'sources.intro.about', defaultMessage: 'We add sources and create collections from media ecosystems around the world. In order to identify the right sources, we use a combination of automated search and discovery, identified lists of influential sources, and expert input from journalists and media practitioners. You can also ' },
  suggestLink: { id: 'sources.intro.suggestLink', defaultMessage: 'suggest a source.' },
  browseMC: { id: 'sources.into.browse.mediacloud', defaultMessage: 'Browse Media Cloud Collections' },
  browseMCabout: { id: 'sources.into.browse.mediacloud.about', defaultMessage: 'See all the collections our team has put together to support our various investigations.' },
  browseGV: { id: 'sources.into.browse.mediacloud', defaultMessage: 'Browse Global Voices Collections' },
  browseGVabout: { id: 'sources.into.browse.mediacloud.about', defaultMessage: 'See country-focused collections we created based on media sources cited by Global Voices.' },
  browseEMM: { id: 'sources.into.browse.emm', defaultMessage: 'Browse EMM Collections' },
  browseEMMabout: { id: 'sources.into.browse.emm.about', defaultMessage: 'See country-focused collections we created based on source in the European Media Monitor project.' },
  created: { id: 'sources.intro.created', defaultMessage: "Collections I've created" },
  loginTitle: { id: 'sources.intro.login.title', defaultMessage: 'Have an Account? Login Now' },
};

const Homepage = (props) => {
  const { goToUrl, user } = props;
  const { formatMessage } = props.intl;
  let sideBarContent;
  if (user.isLoggedIn) {
    sideBarContent = <FavoriteSourcesAndCollectionsContainer />;
  } else {
    sideBarContent = (
      <DataCard>
        <h2><FormattedMessage {...localMessages.loginTitle} /></h2>
        <LoginForm />
      </DataCard>
    );
  }
  return (
    <Grid>
      <Row>
        <Col lg={12}>
          <h1>
            <FormattedMessage {...localMessages.title} />
          </h1>
          <p>
            <FormattedHTMLMessage {...localMessages.about} />
            <Link to={'/sources/suggest'}><FormattedMessage {...localMessages.suggestLink} /></Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={7} xs={12}>
          <FeaturedCollectionsContainer />
        </Col>
        <Col lg={5} xs={12}>
          {sideBarContent}
        </Col>
      </Row>
      <Row>
        <Col lg={4} xs={12}>
          <DescriptiveButton
            imageUrl={assetUrl('/static/img/mediacloud-logo-black-2x.png')}
            label={formatMessage(localMessages.browseMC)}
            description={formatMessage(localMessages.browseMCabout)}
            onClick={() => { goToUrl('/collections/media-cloud'); }}
          />
        </Col>
        <Col lg={4} xs={12}>
          <DescriptiveButton
            imageUrl={assetUrl('/static/img/logo-global-voices.png')}
            label={formatMessage(localMessages.browseGV)}
            description={formatMessage(localMessages.browseGVabout)}
            onClick={() => { goToUrl('/collections/global-voices'); }}
          />
        </Col>
        <Col lg={4} xs={12}>
          <DescriptiveButton
            imageUrl={assetUrl('/static/img/logo-emm.png')}
            label={formatMessage(localMessages.browseEMM)}
            description={formatMessage(localMessages.browseEMMabout)}
            onClick={() => { goToUrl('/collections/european-media-monitor'); }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12} xs={12}>
          <PopularCollectionsContainer />
        </Col>
      </Row>
    </Grid>
  );
};

Homepage.propTypes = {
  intl: PropTypes.object.isRequired,
  // from context
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,       // params from router
  // from state
  user: PropTypes.object.isRequired,
  // from dispatch
  goToUrl: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  goToUrl: (url) => {
    dispatch(push(url));
  },
});

export default
  injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(
      Homepage
    )
  );
