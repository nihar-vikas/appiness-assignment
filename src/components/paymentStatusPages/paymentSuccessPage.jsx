import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import successImage from '../../assets/successImage.svg';
import './style.scss';
import Loader from '../../elements/loader';
import { updatePaymentDetails, CartDetails } from '../../actions/paymentAction';

const PaymentSuccessPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    match: { params },
  } = props;
  const loading = useSelector((state) => state?.paymentReduser?.loading);
  const userDetails = useSelector((state) => state?.AuthReduser?.authData?.userDetails);

  useEffect(() => {
    if (params?.id && userDetails) {
      const data = {
        userName: userDetails?.name,
        userEmail: userDetails?.email,
        userId: userDetails?.id,
      };
      dispatch(updatePaymentDetails(data, params?.id));
      dispatch(CartDetails({}));
      localStorage.removeItem('cartDetails');
    }
  }, [userDetails]);

  return (
    <div className="payment-Success-Page-body">
      <Row>
        <Col md={6} />
        <Col md={12} xs={24}>
          <Row style={{ lineHeight: 'initial !important' }}>
            <Col md={24} xs={24} className="payment-success-page-cells">
              <img
                src={successImage}
                height="200px"
                width="200px"
                alt="carsh"
                className="payment-Success-Image"
              />
            </Col>
            <Col md={24} xs={24} className="payment-success-page-cells">
              <span className="payment-Success-Lable">Payment Successful</span>
            </Col>
            <Col md={24} xs={24} className="payment-success-page-cells">
              <span className="payment-Success-thank-you-Lable">Thank You</span>
            </Col>
            <Col md={24} xs={24} className="payment-success-page-cells">
              <span className="payment-Success-sub-Lable">
                We are equally excited to have you onboard
              </span>
            </Col>
            <Col
              md={24}
              xs={24}
              style={{
                marginTop: '30px',
                textAlign: 'center',
              }}
              className="payment-success-page-cells"
            >
              <Button
                size="large"
                className="payment-Success-back-button"
                style={{ width: '40%', marginRight: '5%' }}
                onClick={() => history.push('/')}
              >
                <ArrowLeftOutlined />
                {' '}
                Back to Dashboard
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={6} />
      </Row>
      {loading ? <Loader /> : null}
    </div>
  );
};

PaymentSuccessPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default PaymentSuccessPage;
