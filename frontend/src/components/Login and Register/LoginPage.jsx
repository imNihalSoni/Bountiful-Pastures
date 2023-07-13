import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, Container, Row, Col } from 'reactstrap';
import Navbar from '../layout/IndexNavbar';
import Footer from '../layout/Footer';
import ErrorModal from '../layout/ErrorModal';
import { login, clearErrors } from '../../actions/userActions';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authenticateUser = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }

    if (isAuthenticated) {
      navigate('/home');
    }
  }, [error, isAuthenticated, navigate]);


  return (
    <Fragment>
      <Navbar />
      <div
        className="page-header"
        style={{
          backgroundImage: 'url(' + require('../../assests/img/login-image.jpg') + ')',
        }}
      >
        <div className="filter" />
        <Container style={{ marginTop: '110px' }}>
          <Row className="d-flex justify-content-center">
            <Col className="ml-auto mr-auto" lg="4">
              <Row className="d-flex justify-content-center">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome</h3>
                  <div className="social-line text-center">{/* Social media buttons */}</div>
                  <Form className="register-form">
                    <label>Email</label>
                    <Input
                      placeholder="Email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button block className="btn-round" color="danger" onClick={authenticateUser}>
                      Login
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button className="btn-link" color="danger" onClick={() => navigate('/register')}>
                      New? Register here!
                    </Button>
                  </div>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />

      <ErrorModal errorMessage={errorMessage} />
    </Fragment>
  );
}

export default LoginPage;
