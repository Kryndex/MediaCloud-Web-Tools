import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AppButton from '../../common/AppButton';
import QueryPickerLoggedInHeader from './QueryPickerLoggedInHeader';
import QueryPickerDemoHeader from './QueryPickerDemoHeader';
import { getShortDate } from '../../../lib/dateUtil';

const localMessages = {
  emptyMedia: { id: 'explorer.querypicker.emptyMedia',
    defaultMessage: 'no media sources or collections' },
  sourcesSummary: { id: 'explorer.querypicker.sources', defaultMessage: '{sourceCount, plural, \n =1 {# source} \n other {# sources }\n}' },
  collectionsSummary: { id: 'explorer.querypicker.coll', defaultMessage: '{collectionCount, plural, \n =1 {# collection} \n other {# collections }\n}' },
  searchHint: { id: 'explorer.querypicker.searchHint', defaultMessage: 'keywords' },
  queryDialog: { id: 'explorer.querypicker.queryDialog', defaultMessage: 'The query label shows up on the legend of the various charts and graphs below. We autogenerate it for you based on your query, but you can also set your own short name to make the charts easier to read.' },
};

const focusUsernameInputField = (input) => {
  if (input) {
    setTimeout(() => { input.focus(); }, 100);
  }
};

class QueryPickerItem extends React.Component {
  state = {
    labelChangeDialogOpen: false,
    labelInDialog: '',  // the actual label they type into the change-label popup dialog
  };

  handleBlurAndSelection = () => {
    const { onQuerySelected, query } = this.props;
    // don't allow selection in demo sample mode
    if (query.searchId === undefined) {
      onQuerySelected();
    }
  };

  updateLabelInDialog = (val) => {
    this.setState({ labelInDialog: val });
  };

  handleLabelEditRequest = () => {
    const { query } = this.props;
    this.setState({ showIconMenu: false, labelChangeDialogOpen: true, labelInDialog: query.label });
  };

  handleLabelClose = () => {
    this.setState({ labelChangeDialogOpen: false });
  };

  handleLabelChangeAndClose = () => {
    const { updateQueryProperty } = this.props;
    this.setState({ labelChangeDialogOpen: false });
    const updatedLabel = this.state.labelInDialog;
    updateQueryProperty('label', updatedLabel);
  };

  handleMenuItemKeyDown = (evt) => {
    const { onSearch } = this.props;
    switch (evt.key) {
      case 'Enter':
        onSearch();
        break;
      default: break;
    }
  };

  handleColorChange = (newColor) => {
    const { updateQueryProperty } = this.props;
    updateQueryProperty('color', newColor);
  }

  render() {
    const { isLoggedIn, query, isSelected, isDeletable, displayLabel, isLabelEditable, updateDemoQueryLabel, onDelete } = this.props;
    const { formatMessage } = this.props.intl;
    let subT = null;
    let headerInfo = null;
    /* query fields are only editable in place for Demo mode. the user can delete a query
      in Logged-In mode, the user can click the icon button, and edit the label of the query or delete the query
    */
    const actions = [
      <AppButton
        label="Cancel"
        primary
        onClick={this.handleLabelClose}
      />,
      <AppButton
        label="Save"
        primary
        keyboardFocused
        onClick={() => this.handleLabelChangeAndClose(query)}
      />,
    ];
    if (query) {
      if (isLoggedIn) {
        headerInfo = (
          <QueryPickerLoggedInHeader
            query={query}
            onLabelEditRequest={this.handleLabelEditRequest}
            isDeletable={isDeletable}
            displayLabel={displayLabel}
            onDelete={onDelete}
            onColorChange={this.handleColorChange}
            handleMenuItemKeyDown={this.handleMenuItemKeyDown}
          />
        );
      } else { // can delete only if this is a custom query (vs sample query) for demo users and this is not the only QueryPickerItem
        headerInfo = (
          <QueryPickerDemoHeader
            query={query}
            isDeletable={isDeletable}
            onDelete={onDelete}
            onColorChange={this.handleColorChange}
            updateDemoQueryLabel={updateDemoQueryLabel}
            isLabelEditable={isLabelEditable}
            handleMenuItemKeyDown={this.handleMenuItemKeyDown}
            focusUsernameInputField={focusUsernameInputField}
          />
        );
      }

      const collectionCount = query.collections ? query.collections.length : 0;
      const sourceCount = query.sources ? query.sources.length : 0;
      // const srcDesc = query.media;
      const totalMediaCount = collectionCount + sourceCount;
      const queryLabel = query.label;
      const oneCollLabelOrNumber = query.collections[0] && query.collections[0].label ? query.collections[0].label : '';
      const oneCollLabel = collectionCount === 1 ? oneCollLabelOrNumber : '';

      const oneCollStatus = oneCollLabel;
      subT = <FormattedMessage {...localMessages.emptyMedia} values={{ totalMediaCount }} />;

      if (sourceCount === 0 && collectionCount === 1) {
        subT = (
          <div className="query-info">
            {displayLabel ? query.label : ''}
            {oneCollStatus}<br />
            {query.startDate ? getShortDate(query.startDate) : ''} to {query.endDate ? getShortDate(query.endDate) : ''}
          </div>
        );
      } else if (totalMediaCount > 0) {
        subT = (
          <div className="query-info">
            {displayLabel ? query.label : ''}
            <FormattedMessage {...localMessages.collectionsSummary} values={{ collectionCount, label: queryLabel }} /><br />
            <FormattedMessage {...localMessages.sourcesSummary} values={{ sourceCount, label: queryLabel }} /><br />
            {query.startDate ? getShortDate(query.startDate) : ''} to {query.endDate ? getShortDate(query.endDate) : ''}
          </div>
        );
      }
    }
    const extraClassNames = (isSelected) ? 'selected' : '';

    return (
      <div
        className={`query-picker-item ${extraClassNames}`}
        onTouchTap={() => this.handleBlurAndSelection()}
      >
        {headerInfo}
        <Dialog
          title="Change Query Label"
          actions={actions}
          modal={false}
          open={this.state.labelChangeDialogOpen}
          onRequestClose={this.handleLabelClose}
        >
          <p><FormattedMessage {...localMessages.queryDialog} /></p>
          <TextField
            className="query-picker-editable-name"
            id="labelInDialog"
            name="labelInDialog"
            onChange={(e, val) => {
              this.updateLabelInDialog(val);
            }}
            ref={focusUsernameInputField}
            hintText={query.label || formatMessage(localMessages.searchHint)}
          />
        </Dialog>
        {subT}
      </div>
    );
  }
}

QueryPickerItem.propTypes = {
  // from parent
  query: PropTypes.object,
  isSelected: PropTypes.bool.isRequired,
  isLabelEditable: PropTypes.bool.isRequired,
  isDeletable: PropTypes.func.isRequired,
  displayLabel: PropTypes.bool.isRequired,
  onQuerySelected: PropTypes.func,
  updateQueryProperty: PropTypes.func.isRequired,
  updateDemoQueryLabel: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loadEditLabelDialog: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  // from composition
  intl: PropTypes.object.isRequired,
};


export default
  injectIntl(
    QueryPickerItem
  );
