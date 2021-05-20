import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';

const App = () => {
  const userResponse = useSelector((state) => state.AuthReduser);
  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />
      <Row>
        <Col md={24} xs={24}>
          <NavBar />
        </Col>
      </Row>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={userResponse?.authData?.userLogin ? Dashboard : LoginForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
