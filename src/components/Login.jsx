import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      myData(token);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-PT/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          },
        }),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem('token', token);
        myData(token);
        navigate('/post');
      } else {
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login.');
    }
  };

  const myData = async (token) => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-PT/users/me`, {
      method: 'GET',  
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/registration">Sign Up</Link></p>
      
      {loginError && (
        <div className="error-message">
          {loginError}
        </div>
      )}
    </div>
  );
}

export default Login;
