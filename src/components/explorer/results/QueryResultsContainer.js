import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import AttentionComparisonContainer from './AttentionComparisonContainer';
import ComparativeWordCloudContainer from './ComparativeWordCloudContainer';
import StorySamplePreview from './StorySamplePreview';
import StoryCountPreview from './StoryCountPreview';
import GeoPreview from './GeoPreview';

const QueryResultsContainer = (props) => {
  const { queries, user, params, lastSearchTime, onSearch } = props;
  // const unDeletedQueries = queries.filter(q => q.deleted !== true);
  return (
    <Grid>
      <Row>
        <Col lg={12} xs={12}>
          <AttentionComparisonContainer lastSearchTime={lastSearchTime} queries={queries} user={user} params={params} />
        </Col>
        <Col lg={12} xs={12}>
          <ComparativeWordCloudContainer lastSearchTime={lastSearchTime} queries={queries} user={user} onSearch={() => onSearch()} />
        </Col>
        <Col lg={12} xs={12}>
          <StorySamplePreview lastSearchTime={lastSearchTime} queries={queries} user={user} params={params} />
        </Col>
        <Col lg={12} xs={12}>
          <StoryCountPreview lastSearchTime={lastSearchTime} queries={queries} user={user} params={params} />
        </Col>
        <Col lg={12} xs={12}>
          <GeoPreview lastSearchTime={lastSearchTime} queries={queries} user={user} params={params} />
        </Col>
      </Row>
    </Grid>
  );
};

QueryResultsContainer.propTypes = {
  intl: PropTypes.object.isRequired,
  // from context
  params: PropTypes.object,       // params from router
  // from state
  user: PropTypes.object,
  queries: PropTypes.array,
  lastSearchTime: PropTypes.number,
  onSearch: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
  queries: state.explorer.queries.queries,
});

export default
  injectIntl(
    connect(mapStateToProps)(
      QueryResultsContainer
    )
  );
