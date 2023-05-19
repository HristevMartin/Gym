import React from 'react';
import './Spinner.css';
import { BeatLoader } from 'react-spinners';

export const Spinner = () => (
  <div className="spinner">
    <BeatLoader size={15} color="#3498db" />
  </div>
);

export default Spinner;
