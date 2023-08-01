import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "./AuthService"; // Import the AuthService

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default ProtectedRoute;
