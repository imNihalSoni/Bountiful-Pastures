import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link,  useNavigate} from "react-router-dom";
import {
  Button,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import IndexNavbar from "../layout/Navbar";
import ProductCard from "../layout/ProductCard";
import Footer from "../layout/Footer";
import Loading from "../layout/Loading";
import ErrorModal from "../layout/ErrorModal";

function LandingPage() {
  let navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/api/v1/products");
      const productsData = response.data.products;
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setErrorMessage(error.message);
      setModalOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const scrollToMain = () => {
    const mainDiv = document.querySelector(".main");
    mainDiv.scrollIntoView({ behavior: "smooth" });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  return (
    <Fragment>
      <IndexNavbar />
      <div
        style={{
          backgroundImage: "url(" + require("../../assests/img/daniel-olahh.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Welcome onboard to the world of freshness</h1>
            <h3>Start shopping fresh farm produce here</h3>
            <br />
            <Button className="btn-round" color="neutral" type="button" outline onClick={scrollToMain}>
              Shop
            </Button>
          </div>
        </Container>
      </div>
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row className="d-flex justify-content-center">
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Let's talk product</h2>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorModal
                isOpen={modalOpen}
                toggleModal={toggleModal}
                errorMessage={errorMessage}
              />
            ) : (
              <Row className="d-flex justify-content-center">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default LandingPage;
