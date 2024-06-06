// Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => (
  <div className="loading-container d-flex justify-content-center align-items-center">
    <ClipLoader color={"#ffffff"} loading={true} size={50} />
  </div>
);

export default Loading;
