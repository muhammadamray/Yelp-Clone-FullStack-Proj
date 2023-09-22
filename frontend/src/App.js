import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import Business from "./components/Business";

function App() {
  return (
    <>
      <Switch>
      <Route path="/resturants">
          <Business />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
          <Splash />
          <Navigation />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
