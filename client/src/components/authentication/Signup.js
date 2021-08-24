import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import { Button } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import '../../App.css';
import './auth.css';
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState({
    status: false,
    msg: '',
  });
  const [errorMessageEmail, setErrorMessageEmail] = useState({
    status: false,
    msg: '',
  });
  const [errorMessageUsername, setErrorMessageUsername] = useState({
    status: false,
    msg: '',
  });
  const [successSignup, setSuccessSignup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let newUser = {
      username: username.toLocaleLowerCase(),
      email: email,
      password: password,
      name: name,
      verified: true,
    };
    axios
      .post('/api/signup', newUser)
      .then((res) => {
        setSuccessSignup(true);
        window.scrollTo(0, 0);
        window.setTimeout(() => {
          setRedirect(true);
          setSuccessSignup(false);
        }, 5000);
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        const errResponse = err.response.data.msg;
        errResponse ===
          'The password needs to be at least 6 characters long.' &&
          setErrorMessagePassword({
            status: true,
            msg: errResponse,
          });

        errResponse === 'An account with this email already exists.'
          ? setErrorMessageEmail({
              status: true,
              msg: errResponse,
            })
          : setErrorMessageEmail({
              status: false,
              msg: '',
            });

        errResponse === 'An account with this username already exists.'
          ? setErrorMessageUsername({
              status: true,
              msg: errResponse,
            })
          : setErrorMessageUsername({
              status: false,
              msg: '',
            });
      });
  };

  /// Error handling

  const passwordErroCheckHandler = () => {
    password.length < 6
      ? setErrorMessagePassword({
          status: true,
          msg: 'The password needs to be at least 6 characters long.',
        })
      : setErrorMessagePassword({
          status: false,
          msg: '',
        });
  };
  return (
    <div className="signup">
      <div className="signup__main">
        {successSignup && (
          <FlashMessage duration={5000} persistOnHover={true}>
            <h3 className="success">
              {' '}
              Successfully registered, now you can login with your account
            </h3>
          </FlashMessage>
        )}
        {redirect && <Redirect to={'/login'} />}

        <Link className="cancel__link" to="/">
          <span>
            {' '}
            <Cancel className="signup__main__cancel" />{' '}
          </span>
        </Link>
        <div className="signup__tittle">
          <h2>Create your account</h2>
        </div>
        <div className="signup__form">
          <form onSubmit={onSubmitHandler}>
            <div className="form__div">
              <label htmlFor="name">name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form__div">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMessageEmail.status && (
                <h3 className="error">{errorMessageEmail.msg}</h3>
              )}
            </div>
            <div className="form__div">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errorMessageUsername.status && (
                <h3 className="error">{errorMessageUsername.msg}</h3>
              )}
            </div>
            <div className="form__div">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                value={password}
                onBlur={passwordErroCheckHandler}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessagePassword.status && (
                <h3 className="error">{errorMessagePassword.msg}</h3>
              )}
            </div>
            <div className="disclaimer">
              <p>
                By checking the box below, you are agreeing to receive emails
                from or on behalf of twitter-clone, our family of companies, or
                one of its third-party associates, to any email you provide.
                These emails could be sent using an automated email system.
                Agreement is not a requirement of purchase and you are free to
                opt-out at any time.
              </p>
            </div>
            <div className="terms">
              <p>
                By continuing you agree to our{' '}
                <Link to="#">Terms & Conditions </Link>. See out{' '}
                <Link to="#">Privacy Notice</Link>
              </p>
              <input className="radio__agreement" type="checkbox" required />
            </div>
            <Button
              variant="outlined"
              fullWidth
              className="signup__btn"
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
