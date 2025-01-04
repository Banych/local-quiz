import React from 'react';
import { LoaderPinwheel } from 'lucide-react';

const SmallLoader = () => {
  return (
    <div className="animate-text-color-change">
      <LoaderPinwheel size={32} className="animate-spin-slow" />
    </div>
  );
};

export default SmallLoader;
