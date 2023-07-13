import React from "react";
import IndexNavbar from "./IndexNavbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
function IndexHeader() {
  let navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <IndexNavbar />
      <Col>
        <Row>
          <div
            className="page-header section-dark"
            style={{
              backgroundImage:
                "url(" + require("../../assests/img/farm.jpg") + ")",
            }}
          >
            <div className="filter" />
            <div className="content-center">
              <Container>
                <div className="title-brand">
                  <h1 className="presentation-title">Bountiful Pastures</h1>
                  <div className="fog-low">
                    <img
                      alt="..."
                      src={require("../../assests/img/fog-low.png")}
                    />
                  </div>
                  <div className="fog-low right">
                    <img
                      alt="..."
                      src={require("../../assests/img/fog-low.png")}
                    />
                  </div>
                </div>
                <h2 className="presentation-subtitle text-center">
                  Everything Fresh
                </h2>
              </Container>
            </div>
            <div
              className="moving-clouds"
              style={{
                backgroundImage:
                  "url(" + require("../../assests/img/clouds.png") + ")",
              }}
            />
          </div>
        </Row>
        <Row>
          <div className="section section-dark text-center" style={{ marginBottom: "10px" }}>
            <Container>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    className="btn-round"
                    outline
                    onClick={() => {
                      navigate("/register");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <i className="fa fa-heart" />
                    Register
                  </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Button className="btn-round" outline onClick={loginPage}>
                    <i className="fa fa-heart" />
                    Sign In
                  </Button>
                </Col>
              </Row>
              <h2 className="title">Our Farmer's Community</h2>
              <Row className="d-flex justify-content-center">
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("../../assests/img/faces/farmer3.jpg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a>
                        <div className="author">
                          <CardTitle tag="h4">Mohan Kumar</CardTitle>
                          <h6 className="card-category">Farmer,Bihar</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        Bountiful Pastures has revolutionized the way I sell my
                        farm outputs. The website's user-friendly interface and
                        efficient logistics have made the entire selling process
                        seamless. I no longer have to worry about finding buyers
                        or transporting my products to distant markets. With
                        Bountiful Pastures, I can focus on farming while
                        enjoying increased sales and better financial stability.
                        It's truly a game-changer for farmers like me.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("../../assests/img/faces/farmer2.jpg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">Nikhil Yadav</CardTitle>
                          <h6 className="card-category">Farmer,Uttar Pradesh</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        I have been selling my farm outputs on Bountiful
                        Pastures for the past year, and I couldn't be happier.
                        The platform has provided me with a wide customer base,
                        allowing me to connect with buyers from different
                        regions. It has not only increased my sales but also
                        boosted my confidence as a farmer. Thanks to Bountiful
                        Pastures, I can now showcase the quality of my produce
                        and earn a fair price for my hard work.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("../../assests/img/faces/farmer1.jpg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">Ashutosh Kumar</CardTitle>
                          <h6 className="card-category">Farmer,Rajasthan</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        As a farmer, finding the right market for my farm
                        outputs was a challenge until I discovered Bountiful
                        Pastures. The platform has given me the opportunity to
                        showcase my products and reach a larger audience. The
                        support and recognition I have received from customers
                        have been overwhelming. Bountiful Pastures has empowered
                        me to run a successful farming business and prove that
                        gender is no barrier in agriculture.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Col>
      <Footer />
    </>
  );
}

export default IndexHeader;
