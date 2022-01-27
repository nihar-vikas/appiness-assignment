import React, { useState } from 'react';
import {
  Row, Col, Avatar, Input, Button, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserLogIn } from '../../actions/auth';
import loginImage from '../../assets/login.svg';

const LoginForm = () => {
  const dispatch = useDispatch();
  const filterEmailId = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [auth, setAuth] = useState({ email: '', password: '', loginType: 'manual' });
  const history = useHistory();
  const loading = useSelector((state) => state?.AuthReduser?.loading);

  const callback = () => {
    setAuth({ email: '', password: '', loginType: 'manual' });
    history.push('/');
  };
  const handleLogin = () => {
    if (!auth.email) {
      message.warning('Please Enter Email Address');
      return;
    }
    if (auth?.email?.match(filterEmailId) === null) {
      message.warning('Please Valid Email Address');
      return;
    }
    if (!auth.password) {
      message.warning('Please Enter Password');
      return;
    }
    dispatch(UserLogIn('login', auth, callback));
  };

  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Col md={2} xs={1} />
        <Col md={8} xs={22} className="login-form-body">
          <Row>
            <Col md={24} xs={24} className="login-form-cell">
              <Row className="login-form-card">
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
                  <h6 className="login-form-headding">Sign in</h6>
                </Col>
                <Col md={24} xs={24} className="login-form-cells">
                  <h6 className="login-form-labels">Email Address</h6>
                  <Input
                    prefix={<UserOutlined />}
                    value={auth?.email}
                    type="email"
                    className="login-form-text-input"
                    allowClear
                    placeholder="Enter Email address"
                    onChange={(e) => setAuth({ ...auth, email: e.target.value.trimLeft() })}
                  />
                  <h6 className="helper_text">
                    {auth?.email && auth?.email?.match(filterEmailId) === null ? 'Please Enter a Valid Email Address' : ''}
                  </h6>
                </Col>
                <Col md={24} xs={24} className="login-form-cells">
                  <h6 className="login-form-labels">Password</h6>
                  <Input.Password
                    prefix={<LockOutlined />}
                    value={auth?.password}
                    onPressEnter={handleLogin}
                    type="password"
                    allowClear
                    className="login-form-text-input"
                    placeholder="Enter Password"
                    onChange={(e) => setAuth({ ...auth, password: e.target.value.trimLeft() })}
                  />
                </Col>
                <Col md={24} xs={24} className="login-form-cells">
                  <Button loading={loading} type="primary" className="login-form-btn" onClick={handleLogin}>Login</Button>
                </Col>
                <Col md={24} xs={24} className="login-form-cells">
                  <h6 className="helper_text" style={{ textAlign: 'right' }}>
                    Not Registered?
                    {' '}
                    <Button type="link" style={{ margin: '0px', padding: '0px' }} onClick={() => history.push('/register')}>Click here to register</Button>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={2} xs={1} />
        <Col md={8} xs={0}>
          <img src={loginImage} alt="crash" className="login-image" />
        </Col>
        <Col md={2} xs={1} />
      </Row>
    </>
  );
};

export default LoginForm;
