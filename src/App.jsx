import './App.css';
import Post from './components/Post';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import RegisterForm from './components/Registration';

function App() {

  return (
    <>
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegisterForm />}/>
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route />
      </Routes>
    </>
  )
}

export default App
