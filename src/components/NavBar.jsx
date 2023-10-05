import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <h1>Stranger Things</h1>
      <Link to="/">Home</Link>
      <div>
        <Link to="/post">Post</Link>
      </div>
      {isLoggedIn ? (
        <button onClick={toggleLogin}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
