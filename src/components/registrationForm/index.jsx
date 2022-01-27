import React, { useState } from 'react';
import {
  Row, Col, Button, Input, Avatar, message,
} from 'antd';
import {
  LockOutlined, UserOutlined, MailOutlined, PhoneOutlined,
} from '@ant-design/icons';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userRegister } from '../../actions/auth';
import loginImage from '../../assets/login.svg';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const filterEmailId = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const loading = useSelector((state) => state?.AuthReduser?.loading);
  const [auth, setAuth] = useState({
    email: '', password: '', firstName: '', phoneNo: '', countryCode: '+91',
  });

  const callback = () => {
    setAuth({
      email: '', password: '', firstName: '', phoneNo: '', countryCode: '+91',
    });
    history.push('/login');
  };

  const registration = () => {
    if (!auth?.firstName) {
      message.warning('Please enter your name');
      return;
    }
    if (!auth?.phoneNo) {
      message.warning('Please enter your phone number');
      return;
    }
    if (!auth?.email) {
      message.warning('Please enter your email address');
      return;
    }
    if (auth?.email?.match(filterEmailId) === null) {
      message.warning('Please enter valid email address');
      return;
    }
    if (!auth?.password) {
      message.warning('Please enter password');
      return;
    }
    dispatch(userRegister(auth, callback));
  };

  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Col md={2} xs={1} />
        <Col md={8} xs={22} className="registration-form-body">
          <Row>
            <Col md={24} xs={24} className="registration-form-cell">
              <Row className="registration-form-card">
                <Col md={24} xs={24} style={{ textAlign: 'center' }}>
                  <Avatar
                    style={{
                      backgroundColor: '#f56a00',
                      verticalAlign: 'middle',
                    }}
                    size="large"
                    gap="4"
                  >
                    <LockOutlined />
                  </Avatar>
                  <h6 className="registration-form-headding">Sign Up</h6>
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <h6 className="registration-form-labels">Name</h6>
                  <Input
                    prefix={<UserOutlined />}
                    value={auth?.firstName}
                    className="registration-form-text-input"
                    allowClear
                    placeholder="Enter your name"
                    onChange={(e) => setAuth({ ...auth, firstName: e.target.value.trimLeft() })}
                  />
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <h6 className="registration-form-labels">Phone Number</h6>
                  <Input
                    prefix={<PhoneOutlined />}
                    value={auth?.phoneNo}
                    className="registration-form-text-input"
                    allowClear
                    type="number"
                    placeholder="Enter your name"
                    onChange={(e) => e.target.value.length < 11
                         && setAuth({ ...auth, phoneNo: e.target.value.trimLeft() })}
                  />
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <h6 className="registration-form-labels">Email Address</h6>
                  <Input
                    prefix={<MailOutlined />}
                    value={auth?.email}
                    type="email"
                    className="registration-form-text-input"
                    allowClear
                    placeholder="Enter Email address"
                    onChange={(e) => setAuth({ ...auth, email: e.target.value.trimLeft() })}
                  />
                  <h6 className="helper_text">
                    {auth?.email && auth?.email?.match(filterEmailId) === null ? 'Please Enter a Valid Email Address' : ''}
                  </h6>
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <h6 className="registration-form-labels">Password</h6>
                  <Input.Password
                    prefix={<LockOutlined />}
                    value={auth?.password}
                    onPressEnter={registration}
                    type="password"
                    allowClear
                    className="registration-form-text-input"
                    placeholder="Enter Password"
                    onChange={(e) => setAuth({ ...auth, password: e.target.value.trimLeft() })}
                  />
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <Button loading={loading} type="primary" className="registration-form-btn" onClick={registration}>Sign Up</Button>
                </Col>
                <Col md={24} xs={24} className="registration-form-cells">
                  <h6 className="helper_text" style={{ textAlign: 'right' }}>
                    Already Registered?
                    {' '}
                    <Button type="link" style={{ margin: '0px', padding: '0px' }} onClick={() => history.push('/login')}>Click here to Login</Button>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={2} xs={1} />
        <Col md={8} xs={0}>
          <img src={loginImage} alt="crash" className="registration-image" />
        </Col>
        <Col md={2} xs={1} />
      </Row>
    </>
  );
};

export default RegistrationForm;
