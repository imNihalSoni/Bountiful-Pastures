import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  let navigate=useNavigate();
  const [activeTab, setActiveTab] = React.useState("1");
  const { user, loading, isAuthenticated} = useSelector((state) => state.user);
  
  const handleUpdate=()=>{
    if(isAuthenticated)
    navigate("/updateprofile");
  }


  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
    
  });
  return (
    <Fragment>
    <Navbar/>
      <div
        style={{
          backgroundImage:
            "url(" + require("../../assests/img/fabio-mangione.jpg") + ")",
        }}
        className="page-header page-header-xs"
        data-parallax={true}
      >
        <div className="filter" />
      </div>
      
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={user.avatar.url}
              />
            </div>
            <div className="name">
              <h4 className="title">
                {user.name}<br />
              </h4>
              <h6 className="description">Music Producer</h6>
            </div>
          </div>
          <Row className="d-flex justify-content-center">
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                An artist of considerable range, Jane Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.
              </p>
              <br />
              <Button onClick={handleUpdate} className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Update Profile
              </Button>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
}

export default ProfilePage;