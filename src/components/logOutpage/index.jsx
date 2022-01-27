import React from 'react';
import { Col, Row } from 'antd';
import './style.scss';
import logOutImage from '../../assets/logOut.svg';

const LogOutPage = () => (
  <>
    <Row>
      <Col md={8} xs={1} />
      <Col md={8} xs={22} className="logout-form-body">
        <Row>
          <Col md={24} xs={24} className="logout-form-cell">
            <Row className="logout-form-card">
              <Col md={24} xs={24}>
                <img className="logout-image" src={logOutImage} alt="src" />
              </Col>
              <Col md={24} xs={24} className="logout-footer">
                <h4>All done! Have a good time 😊</h4>
                <a href="/">Go back to login</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={8} xs={1} />
    </Row>
  </>
);

export default LogOutPage;
