import React from 'react';

const Package = props => {
  const onCrossClick = () => props.onCrossClick(props.pkg);

  return (
    <div className="Package">
      <span onClick={onCrossClick}>✕</span>
      {props.pkg}
    </div>
  );
};

export default Package;
