import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

function AuthForm() {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBF6qBLn2NWqTV9J_qV8p_Oajixx5mI82Q';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBF6qBLn2NWqTV9J_qV8p_Oajixx5mI82Q';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        }

        return res.json().then((_data) => {
          const errorMessage = 'Authentication Failed!';
          // if (_data && _data.error && _data.error.message) {
          //   errorMessage = _data.error.message;
          // }

          throw new Error(errorMessage);
        });
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + data.expiresIn * 1000,
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        /* eslint-disable no-alert */
        alert(err.message);
      });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
