import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./components/ApplicationView";
import { NavBar } from "./components/navbar/NavBar";
import photo from "./images/laughtrackHeader.png"
import "./App.css"

export const App = () => (
  <>
    <Route
      render={() => {
        if (sessionStorage.getItem("active_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);