import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');

    setIsLoggedOut(true);

    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {isLoggedOut && <p>You have successfully logged out.</p>}
    </div>
  );
}

export default Logout;
