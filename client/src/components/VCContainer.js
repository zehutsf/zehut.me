import React from 'react';
import '../styles/components/VCContainer.scss';

const VCContainer = ({children}) => (
  <div className="VCContainer-outer">
    <div className="VCContainer-inner">
      {children}
    </div>
  </div>
);

export default VCContainer;
