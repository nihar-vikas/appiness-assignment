import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { UserLogIn } from '../../actions/auth';
import makePayment from '../../services/paytmPayment';
import { CartDetails } from '../../actions/paymentAction';

const DashboardCard = (props) => {
  const history = useHistory();
  const { userResponse } = props;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.AuthReduser);
  const userData = (lable, value) => (
    <Col md={24} xs={24}>
      <h6 className="dashbord_lable">
        <b>{lable}</b>
        {' : '}
        {value || ''}
      </h6>
    </Col>
  );

  const handlePayment = () => {
    if (userDetails?.authData?.userLogin) {
      window.localStorage.setItem('cartDetails', JSON.stringify({ ...userResponse, email: userDetails?.authData?.userDetails?.email }));
      dispatch(CartDetails({ ...userResponse, email: userDetails?.authData?.userDetails?.email }));
      makePayment(userResponse?.amount, userDetails?.authData?.userDetails?.email);
    } else {
      dispatch(UserLogIn('route', history, () => {}));
    }
  };

  return (
    <Row className="dashboard-card">
      <Col md={24} xs={24} className="dashboard-card-div">
        <Row>
          {userData('Subject Name', userResponse?.name)}
          {userData('Amount', userResponse?.amount)}
          <Button onClick={handlePayment} type="primary">
            <ShoppingCartOutlined />
            &nbsp;Buy Now
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

DashboardCard.propTypes = {
  userResponse: PropTypes.instanceOf(Object).isRequired,
};

export default DashboardCard;

// {lable === 'PhoneNo' ? <a className="dashbord_lable" href={`tel: +91 ${value}`}>{value}</a> : ''}
// {lable === 'Email' ? <a className="dashbord_lable" href={`mailto: ${value}`}>{value}</a> : ''}
