// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserQRCodePage } from './pages/MainPage'
import { AdminPage } from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/main" element={<UserQRCodePage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
