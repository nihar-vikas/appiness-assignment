import React, { useEffect } from 'react';
import {
  Row, Col, Button, Avatar,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';
import Logo from '../../assets/logo.png';
import { UserLogOut } from '../../actions/auth';
import { LOGIN } from '../../constants/actionTypes';

import './style.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const userResponse = useSelector((state) => state.AuthReduser);
  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem('profile'));
    if (userDetails) {
      dispatch({ type: LOGIN, data: { userLogin: true, ...userDetails } || [] });
    }
  }, []);

  const handleLogOut = () => {
    dispatch(UserLogOut());
  };

  return (
    <>
      <Row>
        <Col md={24} xs={24} className="navbar_body">
          <Row align="middle">
            <Col md={6} xs={10}>
              <img src={Logo} alt="crash" width="100%" height="100%" className="navbar_image" />
            </Col>
            {userResponse?.authData?.userLogin ? (
              <Col md={18} xs={14} style={{ textAlign: 'end', fontFamily: 'Poppins', color: '#2A5583' }}>
                <Row align="middle" justify="end">
                  <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }}>
                    {userResponse?.authData?.userDetails?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                    &nbsp;&nbsp;
                  <span>{userResponse?.authData?.userDetails?.name}</span>
                    &nbsp;&nbsp;
                  <Button type="primary" className="logout_btn" onClick={handleLogOut}>
                    Logout&nbsp;
                    <LogoutOutlined />
                  </Button>
                </Row>
              </Col>
            ) : ''}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default NavBar;
