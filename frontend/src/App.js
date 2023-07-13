import './App.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Header from "./components/layout/Header.js"
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";
import "./assests/scss/paper-kit.scss";
import "./assests/scss/demo.css";
import RegisterPage from './components/Login and Register/RegisterPage';
import LoginPage from './components/Login and Register/LoginPage'
import LandingPage from './components/Account Pages/LandingPage';
import ProductPage from './components/Product Pages/ProductPage';
import ProfilePage from './components/Account Pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';


import { loadUser } from "./actions/userActions";
import store from "./store";
import UpdateProfile from './components/Account Pages/UpdateProfile';

function App() {
  // useEffect(() => {

  //   store.dispatch(loadUser());

  // }, []);


  return (
    <Router>
    <Routes>
      <Route path="*" element={<Header />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<ProtectedRoute><LandingPage/></ProtectedRoute> }/>
      <Route path="/products/:productId" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
      <Route exact path="/me" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route exact path="/updateprofile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
    </Routes>
  </Router>
  );
}

export default App;
