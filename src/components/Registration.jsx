import { useState } from 'react';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleRegister = async () => {
    console.log('Hello');
    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-PT/users/register', {
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
      console.error();
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        const { token, message } = responseData;
        localStorage.setItem('token', token);
        setRegistrationMessage(message);
        setRegistrationError('');
      } else {
        setRegistrationError(responseData.message);
        setRegistrationMessage('');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('Registration failed. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
      {registrationMessage && <p>{registrationMessage}</p>}
      {registrationError && <p>{registrationError}</p>}
    </div>
  );
}

export default RegisterForm;
