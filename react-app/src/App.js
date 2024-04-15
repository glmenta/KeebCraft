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
import CreateKeebPage from "./components/CreateKeebPage";
import UpdateKeebPage from "./components/UpdateKeebPage";
import UserKeebsPage from "./components/UserKeebsPage";
import UserPartsPage from "./components/PartUserPage";
import PartListPage from "./components/PartListPage";
import UserFavoritesPage from "./components/UserFavoritesPage";
import Footer from "./components/Footer/footer";
import * as BuildActions from "./store/build";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    // dispatch(BuildActions.fetchAllKeebs());
    // dispatch(true)
  }, [dispatch]);

  return (
    <div className='app'>
      {/* location.pathname !== "/" &&  */}
      {<Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <div className='main-app-content'>
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/keebs/new">
              <CreateKeebPage/>
            </Route>
            <Route exact path="/users/:userId/keebs">
              <UserKeebsPage />
            </Route>
            <Route exact path="/users/:userId/parts">
              <UserPartsPage />
            </Route>
            <Route exact path="/users/:userId/favorites">
              <UserFavoritesPage />
            </Route>
            <Route exact path="/keebs/:keebId/edit" component={UpdateKeebPage}>
              <UpdateKeebPage/>
            </Route>
            <Route path="/keebs/:keebId">
              <KeebDetailPage />
            </Route>
            <Route path="/keebs">
              <KeebBuildPage />
            </Route>
            <Route path='/parts'>
              <PartListPage/>
            </Route>
            <Route path="/" exact>
              <LandingPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      )}
    </div>
);
}

export default App;
