/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'antd';
import './style.scss';

const DashboardCard = (props) => {
  const { userResponse } = props;
  const userData = (lable, value) => (
    <Col md={24} xs={24}>
      <h6 className="dashbord_lable">
        <b>{lable}</b>
        {' : '}
        {lable === 'PhoneNo' ? <a className="dashbord_lable" href={`tel: +91 ${value}`}>{value}</a> : ''}
        {lable === 'Email' ? <a className="dashbord_lable" href={`mailto: ${value}`}>{value}</a> : ''}
        {lable !== 'PhoneNo' && lable !== 'Email' ? value : ''}
      </h6>
    </Col>
  );

  return (
    <Row className="dashboard-card">
      <Col md={24} xs={24} className="dashboard-card-div">
        <Row>
          {userData('Name', userResponse?.name)}
          {userData('Age', userResponse?.age)}
          {userData('Gender', userResponse?.gender)}
          {userData('Email', userResponse?.email)}
          {userData('PhoneNo', userResponse?.phoneNo)}
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardCard;
