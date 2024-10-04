import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Oval
        height={80}
        width={80}
        color="#3498db"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f3f3f3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoaderComponent;