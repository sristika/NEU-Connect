import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/registerUser';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/');
    }
  }, [redirectToLogin]);

  const validateUsername = (username) => {
    return username.length >= 5 && username.length <= 20;
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateUsername(username)) {
      setErrorMessage('Username must be between 5 and 20 characters.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include a number, an uppercase letter, and a lowercase letter.'
      );
      return;
    }

    try {
      const response = await registerUser(username, password, name);
      console.log('response', response);
      if (response.status === 200) {
        setRedirectToLogin(true);
      }
    } catch (error) {
      console.log('error', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mt-3">Register</h2>
              <form onSubmit={handleRegister} id="registerForm">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn lightblue-btn my-2"
                  id="registerBtn"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="btn lightblue-btn my-2 mx-4"
                  id="loginPageBtn"
                  onClick={() => navigate('/')}
                >
                  Login
                </button>
              </form>
              {errorMessage && (
                <p className="mt-3 text-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
