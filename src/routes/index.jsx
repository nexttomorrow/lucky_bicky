import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import FortunePage from '../pages/Fortune';
import LottoPage from '../pages/Lotto';
import NamingPage from '../pages/Naming';
import ProfilePage from '../pages/Profile';
import AllActivities from '../pages/Profile/pages/AllActivities';
import SavedResultsPage from '../pages/Profile/pages/SavedResults';
import SignUp from '../pages/Profile/pages/SignUp';
import NotificationSettings from '../pages/Profile/pages/NotificationSettings';
import AccountManagement from '../pages/Profile/pages/AccountManagement';
import PremiumSubscription from '../pages/Profile/pages/PremiumSubscription';
import PrivacyPolicy from '../pages/Profile/pages/PrivacyPolicy';

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
      <Route path="/profile/notifications" element={<NotificationSettings />} />
      <Route path="/profile/account" element={<AccountManagement />} />
      <Route path="/profile/premium" element={<PremiumSubscription />} />
      <Route path="/profile/privacy" element={<PrivacyPolicy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 