import React from 'react';
import { Col, Row } from 'antd';
import './style.scss';
import pageNotFound from '../../assets/pageNotFound.svg';

const PageNotFound = () => (
  <>
    <Row>
      <Col md={8} xs={1} />
      <Col md={8} xs={22} className="page-not-found-body">
        <Row>
          <Col md={24} xs={24} className="page-not-found-cell">
            <Row className="page-not-found-card">
              <Col md={24} xs={24}>
                <img className="page-not-found-image" src={pageNotFound} alt="src" />
              </Col>
              <Col md={24} xs={24} className="page-not-found-footer">
                <h4>Page Not Found</h4>
                <a href="/">Go back</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={8} xs={1} />
    </Row>
  </>
);

export default PageNotFound;
