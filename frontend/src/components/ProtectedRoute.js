import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null; // Render null or a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.children ;
};

export default ProtectedRoute;
