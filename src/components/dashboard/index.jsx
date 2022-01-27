import React from 'react';
import { Row, Col, Divider } from 'antd';
import UserData from './userDetails.json';
import './style.scss';
import DashboardCard from './dashboard-card';

const Dashboard = () => {
  const userDetails = UserData;
  return (
    <>
      <Row className="user_dashboard_body">
        <Col md={24} xs={24} className="user_dashboard_header_div">
          <h1 className="user_dashboard_header">Dashboard</h1>
          <Divider style={{ margin: '5px 0px' }} />
        </Col>
        <Col md={24} xs={24} className="user_dashboard_body_div">
          <Row>
            {userDetails?.user?.map((item) => (
              <Col md={6} xs={24} key={item.id}>
                <DashboardCard userResponse={item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
