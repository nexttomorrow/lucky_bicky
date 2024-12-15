import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import MenuSection from './components/MenuSection';
import Settings from './components/Settings';
import LoginForm from './components/LoginForm';

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '최근 활동',
      description: '나의 운세, 로또, 작명 활동 내역',
      onClick: () => navigate('/profile/activities')
    },
    {
      title: '저장된 결과',
      description: '저장해둔 운세와 로또 번호',
      onClick: () => navigate('/profile/saved')
    }
  ];

  return (
    <div className="space-y-6 pt-2">
      <h1 className="text-2xl font-bold px-4 mb-4">내 정보</h1>
      {isLoggedIn ? (
        <>
          <UserProfile />
          <MenuSection items={menuItems} />
          <Settings />
        </>
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default ProfilePage; 