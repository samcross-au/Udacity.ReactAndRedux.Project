import { useEffect, Fragment, useRef } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { connect } from "react-redux";

import {handleInitialData} from '../actions/shared';
import {unsetAuthedUser} from '../actions/authedUser';

import LoadingBar from "./LoadingBar";
import Navigation from "./Navigation";
import Dashboard from "../pages/Dashboard";
import Leaderboard from "../pages/Leaderboard";
import Poll from "../pages/Poll";
import NewQuestion from "../pages/NewQuestion";
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const App = (props) => {
  const location = useLocation();
  const navType = useNavigationType();
  const initialMount = useRef(true);

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props.dispatch]);

  useEffect(() => {
    if (navType === "POP") {
      props.dispatch(unsetAuthedUser());
    }
  }, [location.pathname, navType, props.dispatch]);
  
  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.authed ? (
          <div>
            <Navigation />
            <div className="content">
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/question/:id" element={<Poll />} />
                <Route path="/new" element={<NewQuestion />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  logger: true,
  authed: authedUser !== null,
});

export default connect(mapStateToProps)(App);
