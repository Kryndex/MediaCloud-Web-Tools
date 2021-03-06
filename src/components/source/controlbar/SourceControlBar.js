import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import { push } from 'react-router-redux';
import SourceSearchContainer from './SourceSearchContainer';

const SourceControlBar = props => (
  <div className="controlbar controlbar-sources">
    <div className="main">
      <Grid>
        <Row>
          <Col lg={6} xs={12} className="left">
            {props.children}
          </Col>
          <Col lg={6} xs={12} className="right">
            <SourceSearchContainer
              onAdvancedSearchSelected={props.handleAdvancedSearchSelected}
              onMediaSourceSelected={props.handleMediaSourceSelected}
              onCollectionSelected={props.handleCollectionSelected}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

SourceControlBar.propTypes = {
  // from parent
  children: PropTypes.node,
  // from context
  intl: PropTypes.object.isRequired,
  // from dispatch
  handleMediaSourceSelected: PropTypes.func.isRequired,
  handleCollectionSelected: PropTypes.func.isRequired,
  handleAdvancedSearchSelected: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  handleMediaSourceSelected: (item) => {
    dispatch(push(`/sources/${item.id}`));
  },
  handleCollectionSelected: (item) => {
    dispatch(push(`/collections/${item.id}`));
  },
  handleAdvancedSearchSelected: (searchStr) => {
    dispatch(push(`/search?search=${searchStr}`));
  },
});

export default
  injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(
      SourceControlBar
    )
  );

