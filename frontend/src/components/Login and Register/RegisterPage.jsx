// import React from "react";
// import { useState,useEffect } from "react";
// import { clearErrors,register } from "../../actions/userActions";

// // reactstrap components
// import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// // core components
// import ExamplesNavbar from "../layout/IndexNavbar";
// import ErrorModal from "../layout/ErrorModal";
// import { useNavigate } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";

// function RegisterPage() {
//   let dispatch=useDispatch();
//   let navigate = useNavigate(); 
//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.user
//   );

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [errorModalOpen, setErrorModalOpen] = useState(false);
//   const [errorMessage,setErrorMessage]=useState("");

//   const registerSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", user.name);
//     myForm.set("email", user.email);
//     myForm.set("password", user.password);
//     dispatch(register(myForm));
//   };

//   const registerDataChange = (e) => {
//       setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (error) {
//       setErrorMessage(error);
//       setErrorModalOpen(true);
//     }

//     if (isAuthenticated) {
//       navigate("/home");
//     }
//   }, [dispatch, error, isAuthenticated, navigate]);

//   const closeModal = () => {
//     setErrorModalOpen(false);
//     dispatch(clearErrors());
//   };

  
//   document.documentElement.classList.remove("nav-open");
//   React.useEffect(() => {
//     document.body.classList.add("register-page");
//     return function cleanup() {
//       document.body.classList.remove("register-page");
//     };
//   });
//   return (
//     <>
//     <ExamplesNavbar />
        
      
//       <div
//         className="page-header"
//         style={{
//           backgroundImage:
//             "url(" + require("../../assests/img/login-image.jpg") + ")",
//         }}
//       >
        
//         <div className="filter" />
//         <Container style={{marginTop:"110px"}}>
//           <Row className="d-flex justify-content-center">
//             <Col className="ml-auto mr-auto" lg="4">
//               <Row className="d-flex justify-content-center">
//                 <Card className="card-register ml-auto mr-auto">
//                   <h3 className="title mx-auto">Welcome</h3>
//                   <div className="social-line text-center">
//                    {/* //social media */}
//                   </div>
//                   <Form className="register-form">
//                     <label>Name</label>
//                     <Input placeholder="Name" name="name" type="text" onChange={registerDataChange}/>
//                     <label>Email</label>
//                     <Input placeholder="Email" name="email" type="text" onChange={registerDataChange}/>
//                     <label>Password</label>
//                     <Input placeholder="Password" name="password" type="password" onChange={registerDataChange}/>
//                     <Button block className="btn-round" color="danger" onClick={registerSubmit}>
//                       Register
//                     </Button>
//                   </Form>
//                   <div className="forgot">
//                     <Button
//                       className="btn-link"
//                       color="danger"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                     >
//                       Forgot password?
//                     </Button>
//                   </div>
//                 </Card>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//         <div className="footer register-footer text-center">
//           <h6>
//             © {new Date().getFullYear()}, made with{" "}
//             <i className="fa fa-heart heart" /> Nihal
//           </h6>
//         </div>
//       </div>
//       <ErrorModal
//   isOpen={errorModalOpen}
//   toggleModal={closeModal}
//   errorMessage={errorMessage}
// />
//     </>
//   );
// }

// export default RegisterPage;
import React, { useState, useEffect } from "react";
import { clearErrors, register } from "../../actions/userActions";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import ExamplesNavbar from "../layout/IndexNavbar";
import ErrorModal from "../layout/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setErrorModalOpen(true);
    }

    if (isAuthenticated) {
      navigate("/home");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const closeModal = () => {
    setErrorModalOpen(false);
    dispatch(clearErrors());
  };

  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("../../assests/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container style={{ marginTop: "110px" }}>
          <Row className="d-flex justify-content-center">
            <Col className="ml-auto mr-auto" lg="4">
              <Row className="d-flex justify-content-center">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome</h3>
                  <div className="social-line text-center">{/* social media */}</div>
                  <Form className="register-form">
                    <label>Name</label>
                    <Input placeholder="Name" name="name" type="text" onChange={registerDataChange} />
                    <label>Email</label>
                    <Input placeholder="Email" name="email" type="text" onChange={registerDataChange} />
                    <label>Password</label>
                    <Input placeholder="Password" name="password" type="password" onChange={registerDataChange} />
                    <Button block className="btn-round" color="danger" onClick={registerSubmit}>
                      Register
                    </Button>
                  </Form>
                  {/* <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div> */}
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      onClick={() => navigate('/login')}
                    >
                      Regstered Already?
                    </Button>
                  </div>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with <i className="fa fa-heart heart" /> Nihal
          </h6>
        </div>
      </div>
      <ErrorModal isOpen={errorModalOpen} toggleModal={closeModal} errorMessage={errorMessage} />
    </>
  );
}

export default RegisterPage;
