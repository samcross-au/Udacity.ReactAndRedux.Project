import { useEffect, Fragment } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 

import {handleInitialData} from '../actions/shared';
import {unsetAuthedUser} from '../actions/authedUser';
import { AuthProvider } from "../server/AuthProvider";

import LoadingBar from "./LoadingBar";
import Navigation from "./Navigation";
import Dashboard from "../pages/Dashboard";
import Leaderboard from "../pages/Leaderboard";
import Poll from "../pages/Poll";
import NewQuestion from "../pages/NewQuestion";
import Profile from '../pages/Profile';
import Login from '../pages/Login';

const App = () => {
  const dispatch = useDispatch();
  const authed = useSelector(({ authedUser }) => authedUser !== null);
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (navType === "POP") {
      dispatch(unsetAuthedUser());
    }
  }, [location.pathname, navType, dispatch]);
  
  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {authed ? (
          <div>
            <Navigation />
            <div className="content">
              <AuthProvider>
                <Routes>
                  <Route path="/" exact element={<Dashboard />} />
                  <Route path="/question/:id" element={<Poll />} />
                  <Route path="/new" element={<NewQuestion />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </AuthProvider>
              </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Fragment>
  );
};

export default App;
