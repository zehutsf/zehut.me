import React from 'react';
import '../styles/components/InfoCardGrid.scss';
import chunk from 'lodash/chunk';

const InfoCardGrid = ({ children, cols=2 }) => {
  
  const chunked = chunk(children, cols);
  const rows = chunked.map(row => (
    <div className="InfoCardGrid-row">
      {row.map(item => (
        <div className="InfoCardGrid-cell">
            {item}
          </div>
      ))}
    </div>
  ));

  return (
    <div className="InfoCardGrid">
      {rows}
    </div>
  );
};

export default InfoCardGrid;