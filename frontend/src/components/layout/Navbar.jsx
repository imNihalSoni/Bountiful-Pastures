import React, { Fragment } from "react";import { useState} from "react";
import ErrorModal from "./ErrorModal";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Col,
  Container,
} from "reactstrap";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout,clearErrors, loadUser } from '../../actions/userActions';

function IndexNavbar({white=false}) {
  const [navbarColor, setNavbarColor] = React.useState(white?"":"navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  let initial=navbarColor;

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated,isLoggedOut } = useSelector(
    (state) => state.user
  );

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage,setErrorMessage]=useState("");

  const logoutOperation=()=>{
    setErrorMessage("Logged Out");
    setErrorModalOpen(true);
    navigate("/");
    dispatch(logout());
    
    
  }
  const homeOperation=()=>{
    navigate("/home");
    
    
  }

  const profileOperation=()=>{
    dispatch(loadUser());
    if(isAuthenticated){
      navigate("/me");
    }

  }

  React.useEffect(() => {
    
    const updateNavbarColor = () => {
      if(initial!==""){
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    }
    };
  
  
    
  
    window.addEventListener("scroll", updateNavbarColor);
  
    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [dispatch, error, isAuthenticated, navigate]);
  

  const closeModal = () => {
    setErrorModalOpen(false);
    dispatch(clearErrors());
  };
  return (
    <Fragment>
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
            <Col className="justify-content-center">
        {/* <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Nihal"
          >Bountiful Pastures
          </NavbarBrand> */}
          </Col>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
          <NavItem>
              <NavLink
                onClick={homeOperation}
                title="Home"
              >
                <i className="fa fa-home" />
                <p className="d-lg-none">Home</p>
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink
                title="My Cart"
              >
                <i className="fa fa-shopping-cart" />
                <p className="d-lg-none">My Cart</p>
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                onClick={logoutOperation}
                title="Log Out"
              >
                <i className="fa fa-sign-out" />
                <p className="d-lg-none">Log Out</p>
              </NavLink>
              </NavItem>
              
              <NavItem>
              <NavLink
                onClick={profileOperation}
                title="My Profile"
              >
                <i className="fa fa-user" />
                <p className="d-lg-none">My Profile</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    <ErrorModal
    isOpen={errorModalOpen}
    toggleModal={closeModal}
    errorMessage={errorMessage}
  />
  </Fragment>
  );
}

export default IndexNavbar;