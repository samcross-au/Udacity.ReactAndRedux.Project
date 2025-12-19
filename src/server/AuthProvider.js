import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { mockAuth } from "./mock-auth-server";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({});
  const [isError, setIsError] = useState(false);

  const isUserAuthenticated = () =>
    authState && Object.keys(authState)?.length > 0 ? true : false;

  const login = (username) => {
    const user = mockAuth.login(username);
    setAuthState(user);
    setIsError(!isUserAuthenticated());
  };

  const logout = () => {
    setAuthState({});
    setIsError(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        isUserAuthenticated,
        login,
        logout,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };