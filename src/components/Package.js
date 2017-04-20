import React from 'react';
import './Package.css';

const Package = props => {
  const onCrossClick = () => props.onCrossClick(props.pkg);

  return (
    <div className="Package">
      <span className="remove" onClick={onCrossClick}>✕</span>
      {props.pkg}
    </div>
  );
};

export default Package;
