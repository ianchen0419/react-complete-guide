import React, { useState, useMemo, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (_email, _password) => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const defaultContextValue = useMemo(() => {
    function logoutHandler() {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }

    function loginHandler() {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
    }

    return {
      isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={defaultContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
