import React from 'react';

import './loading-spinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex grow items-center justify-center">
      <div className="hypnotic" />
    </div>
  );
};

export default LoadingSpinner;
