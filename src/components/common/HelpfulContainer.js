import React from 'react';
import { FormattedHTMLMessage, injectIntl } from 'react-intl';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import messages from '../../resources/messages';
import { HelpButton } from './IconButton';

/**
 * Use this with the JS Composition pattern to make a Container that has a help button.
 * Clicking that button brings up a dialog with the title and text from the message key
 * that you specify.
 * `contentHTMLTextMsgId` can be a intl message id or an array of intl message ids.
 */
function composeHelpfulContainer(contentTitleMsgId, contentHTMLTextMsgId) {
  return (ChildComponent) => {
    class HelpfulContainer extends React.Component {
      state = {
        open: false,
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      render() {
        const { formatMessage } = this.props.intl;
        const dialogActions = [
          <FlatButton
            label={formatMessage(messages.ok)}
            primary
            onClick={this.handleClose}
          />,
        ];
        const helpButton = <HelpButton onClick={this.handleOpen} />;
        let content = null;
        if (Array.isArray(contentHTMLTextMsgId)) {
          content = contentHTMLTextMsgId.map(msgId => <FormattedHTMLMessage key={msgId.id} {...msgId} />);
        } else {
          content = <FormattedHTMLMessage {...contentHTMLTextMsgId} />;
        }
        return (
          <div className="helpful">
            <ChildComponent {...this.props} helpButton={helpButton} />
            <Dialog
              title={formatMessage(contentTitleMsgId)}
              actions={dialogActions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              {content}
            </Dialog>
          </div>
        );
      }
    }

    HelpfulContainer.propTypes = {
      intl: React.PropTypes.object.isRequired,
    };

    return injectIntl(HelpfulContainer);
  };
}

export default composeHelpfulContainer;