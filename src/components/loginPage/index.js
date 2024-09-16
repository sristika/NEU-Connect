import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/loginUser';
import { useUser } from '../../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const LoginPage = () => {
  const { login, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        navigate('/home');
      } else {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      const loggedIn = await isLoggedIn();
      if (res.status === 200 && loggedIn) {
        login(username);
        navigate('/home');
      } else {
        throw res;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        setErrorMessage(error.response.data.message);
      else setErrorMessage('Login failed. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-3">Login</h2>
              <form onSubmit={handleSubmit} id="loginForm">
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
                <button
                  id="loginBtn"
                  type="submit"
                  className="btn my-2 login-button-margin lightblue-btn"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn lightblue-btn mx-4 my-2"
                  id="registerBtn"
                  onClick={() => navigate('/register')}
                >
                  Register
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

export default LoginPage;
