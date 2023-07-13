import React, { Fragment } from "react";
import { Row, Container,Col } from "reactstrap";
import { animateScroll as scroll } from "react-scroll";

function Footer() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Fragment>
    <footer className="footer footer-black footer-white section-dark">
      <Container>
        <Row>
            <Col className="d-flex justify-content-center">
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href=""
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href=""
                  target="_blank"
                >
                  Contact Us 
                </a>
              </li>
              <li>
                <a
                   style={{ cursor: "pointer" }}
                  className="back-to-top" onClick={scrollToTop}
                >
                  Back To Top 
                </a>
              </li>
            </ul>
          </nav>
          </Col>
          <Col className="d-flex justify-content-center">
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Nihal
            </span>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
    </Fragment>
  );
}

export default Footer;
