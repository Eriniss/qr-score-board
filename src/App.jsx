// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserQRCodePage } from './pages/MainPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/main" element={<UserQRCodePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
