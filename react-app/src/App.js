import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import KeebBuildPage from "./components/KeebBuildPage";
import KeebDetailPage from "./components/KeebDetailPage";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {location.pathname !== "/" && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/keebs/:keebId">
            <KeebDetailPage />
          </Route>
          <Route path="/keebs">
            <KeebBuildPage />
          </Route>
          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
