import React from 'react';

/**
 * The primary unit of our interface. Any self-contained piece of a larger report page should
 * be inside of a DataCard.
 */
const DataCard = (props) => {
  const { children, border, disabled, className } = props;
  const unborderedClass = (border === false) ? 'unbordered' : '';
  const disabledClass = (disabled === true) ? 'disabled' : '';
  const rootClasses = `${unborderedClass} ${disabledClass}`;
  const classes = `datacard ${rootClasses} ${className}`;
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

DataCard.propTypes = {
  // from parent
  children: React.PropTypes.node.isRequired,
  border: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default DataCard;
