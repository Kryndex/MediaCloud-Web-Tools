import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreOptionsIcon from './icons/MoreOptionsIcon';
import CloseIcon from './icons/CloseIcon';
import { getBrandDarkColor, getBrandDarkerColor } from '../../styles/colors';

class ActionMenu extends React.Component {
  state = {
    backgroundColor: getBrandDarkColor(),
    isPopupOpen: false,
  };

  handlePopupOpenClick = (event) => {
    if (event) {
      event.preventDefault();
      this.setState({
        isPopupOpen: !this.state.isPopupOpen,
        anchorEl: event.currentTarget,
      });
    } else {
      this.setState({
        isPopupOpen: !this.state.isPopupOpen,
      });
    }
  }
  handleMouseEnter = () => {
    this.setState({ backgroundColor: getBrandDarkerColor() });
  }
  handleMouseLeave = () => {
    this.setState({ backgroundColor: getBrandDarkColor() });
  }

  render() {
    const { color, openButton, closeButton, children } = this.props;

    const otherProps = {};
    otherProps.backgroundColor = this.state.backgroundColor;
    let closeIconButton = (
      <IconButton style={{ padding: 0, margin: 0, width: 32, height: 32 }} >
        <CloseIcon color={color} {...otherProps} />
      </IconButton>
    );
    let openIconButton = (
      <IconButton style={{ padding: 0, margin: 0, width: 32, height: 32 }} >
        <MoreOptionsIcon color={color} {...otherProps} />
      </IconButton>
    );

    if (openButton) {
      openIconButton = open;
    }
    if (closeButton) {
      closeIconButton = close;
    }

    const icon = (this.state.isPopupOpen) ? closeIconButton : openIconButton;

    return (
      <div className="action-icon-menu">
        <IconMenu
          open={this.state.isPopupOpen}
          iconButtonElement={icon}
          onRequestChange={() => this.handlePopupOpenClick(event)}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {children}
        </IconMenu>
      </div>
    );
  }
}
ActionMenu.propTypes = {
  onClick: PropTypes.func,
  topLevelButton: PropTypes.func,
  children: PropTypes.array,
  openButton: PropTypes.object,
  closeButton: PropTypes.object,
  tooltip: PropTypes.string,
  intl: PropTypes.object.isRequired,
  color: PropTypes.string,
  iconStyle: PropTypes.object,
};

export default injectIntl(ActionMenu);
