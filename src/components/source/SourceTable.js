import React from 'react';
import Link from 'react-router/lib/Link';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../resources/messages';
import { googleFavIconUrl } from '../../lib/urlUtil';

const SourceTable = (props) => {
  const sourceHeader = <FormattedMessage {...messages.sourceName} />;
  const { sources } = props;
  return (
    <div className="source-table">
      <table width="100%">
        <tbody>
          <tr>
            <th>{sourceHeader}</th>
            <th />
            <th><FormattedMessage {...messages.sourceLink} /></th>
          </tr>
          {sources.map((source, idx) =>
            (<tr key={source.id} className={(idx % 2 === 0) ? 'even' : 'odd'}>
              <td>
                <Link to={`/sources/${source.id}/details`}>
                  {source.name}
                </Link>
              </td>
              <td>
                <img className="google-icon" src={googleFavIconUrl(source.url)} alt={source.name} />
              </td>
              <td>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.url}
                </a>
              </td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

SourceTable.propTypes = {
  // from parent
  sources: React.PropTypes.array.isRequired,
  // from composition chain
  intl: React.PropTypes.object.isRequired,
};

export default injectIntl(SourceTable);