import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import LogOutPage from './components/logOutpage';
import PageNotFound from './components/pageNotFound';
import RegistrationForm from './components/registrationForm';
import PaymentSuccessPage from './components/paymentStatusPages/paymentSuccessPage';
import PaymentFailurePage from './components/paymentStatusPages/paymentFailurePage';
// const userResponse = useSelector((state) => state.AuthReduser);
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
          <Route path="/" exact component={Dashboard} />
          <Route path="/register" exact component={userResponse?.authData?.userLogin ? () => <Redirect to="/" /> : RegistrationForm} />
          <Route path="/login" exact component={userResponse?.authData?.userLogin ? () => <Redirect to="/" /> : LoginForm} />
          <Route path="/logout" exact component={LogOutPage} />
          <Route path="/payment_success/:id" exact component={PaymentSuccessPage} />
          <Route path="/payment_failure" exact component={PaymentFailurePage} />
          <Route path="**" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default App;
