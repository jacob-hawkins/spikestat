import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { useContext } from 'react';
import './app.css';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path='/' element={user ? <Home /> : <Login />} />
                <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
                <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
                <Route path='/profile/:username' element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
