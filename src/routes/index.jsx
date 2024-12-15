import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import FortunePage from '../pages/Fortune';
import LottoPage from '../pages/Lotto';
import NamingPage from '../pages/Naming';
import ProfilePage from '../pages/Profile';
import AllActivities from '../pages/Profile/pages/AllActivities';
import SavedResultsPage from '../pages/Profile/pages/SavedResults';
import SignUp from '../pages/Profile/pages/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fortune" element={<FortunePage />} />
      <Route path="/lotto" element={<LottoPage />} />
      <Route path="/naming" element={<NamingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/activities" element={<AllActivities />} />
      <Route path="/profile/saved" element={<SavedResultsPage />} />
      <Route path="/profile/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 