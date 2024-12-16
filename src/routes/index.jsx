import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Fortune from '../pages/Fortune';
import Lotto from '../pages/Lotto';
import Naming from '../pages/Naming';
import Profile from '../pages/Profile';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fortune" element={<Fortune />} />
      <Route path="/lotto" element={<Lotto />} />
      <Route path="/naming" element={<Naming />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile/premium" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes; 