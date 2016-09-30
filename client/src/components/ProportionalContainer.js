import React from 'react';

const containerStyle = { width: '100%' };
const outerStyle = { position: 'relative', width: '100%' };
const innerStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };

const createOuterStyle = (ratio) => ({
  ...outerStyle,
  paddingTop: (ratio * 100) + '%'
});

const ProportionalContainer = ({ ratio = 1, children, ...rest }) => {
  return (
    <div style={containerStyle} {...rest} >
      <div style={createOuterStyle(ratio)}>
        <div style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProportionalContainer;
