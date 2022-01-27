import React from 'react';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import failImage from '../../assets/failImage.svg';
import { UserLogIn } from '../../actions/auth';
import makePayment from '../../services/paytmPayment';
import { CartDetails } from '../../actions/paymentAction';

const PaymentFailurePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.AuthReduser);
  const cartDetails = JSON.parse(localStorage.getItem('cartDetails'));

  const handlePayment = () => {
    if (userDetails?.authData?.userLogin && cartDetails) {
      dispatch(CartDetails({ ...cartDetails }));
      makePayment(cartDetails?.amount, userDetails?.authData?.userDetails?.email);
    } else {
      dispatch(UserLogIn('route', history, () => {}));
    }
  };

  return (
    <div className="paymentFailPagebody">
      <Row>
        <Col md={6} />
        <Col md={12} xs={24}>
          <Row style={{ lineHeight: 'initial !important' }}>
            <Col md={24} xs={24} className="PaymentFailImage">
              <img src={failImage} height="100%" width="200px" alt="carsh" />
            </Col>
            <Col md={24} xs={24}>
              <span className="paymentFailLable">Payment unsuccessful !</span>
            </Col>
            <Col md={24} xs={24}>
              <span className="tryLable">Try again</span>
            </Col>
            <Col md={24} xs={24}>
              <span className="subtext">
                We are sorry to inform you that we were
                <br />
                Unable to process your transaction
              </span>
            </Col>
            <Col xs={24} md={24} style={{ marginTop: '30px' }}>
              <Row>
                <Col md={3} xs={1} />
                <Col md={8} xs={22}>
                  <Button size="large" className="backButton" onClick={() => { history.push('/'); localStorage.removeItem('cartDetails'); }}>
                    <ArrowLeftOutlined />
                    {' '}
                    Back to Dashboard
                  </Button>
                </Col>
                <Col md={1} xs={1} />
                <Col xs={1} />
                <Col md={8} xs={22}>
                  <Button size="large" className="tryButton" onClick={handlePayment}>Try Again</Button>
                </Col>
                <Col md={3} xs={1} />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={6} />
      </Row>
    </div>
  );
};

export default PaymentFailurePage;
