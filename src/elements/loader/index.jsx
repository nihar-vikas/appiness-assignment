import React from 'react';
import { Spin } from 'antd';
import './style.scss';

const Loader = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Spin tip="Loading..." size="large" className="spinloading" {...props} />
);

export default Loader;
