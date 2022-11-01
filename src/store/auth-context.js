import React, { useCallback, useEffect, useMemo, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (_loginToken) => {},
  logout: () => {},
});

function calculateRemainingTime(expirationTime) {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
}

function retrieveStoredToken() {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
}

export function AuthContextProvider(props) {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  // function loginHandler(loginToken) {
  //   setToken(loginToken);
  // }

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    // optional: redirect the user

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (loginToken, expirationTime) => {
      setToken(loginToken);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);

      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [token, logoutHandler],
  );

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = useMemo(
    () => ({
      token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [userIsLoggedIn, token, loginHandler, logoutHandler],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
