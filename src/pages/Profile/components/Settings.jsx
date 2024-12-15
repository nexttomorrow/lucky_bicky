import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase/auth';
import LogoutModal from './LogoutModal';

const Settings = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settings = [
    { 
      title: '알림 설정', 
      description: '푸시 알림 및 이메일 수신 설정',
      onClick: () => navigate('/profile/notifications')
    },
    { 
      title: '계정 관리', 
      description: '비밀번호 변경 및 계정 정보 수정',
      onClick: () => navigate('/profile/account')
    },
    { 
      title: '프리미엄 구독', 
      description: '구독 상태 및 결제 관리',
      onClick: () => navigate('/profile/premium')
    },
    { 
      title: '개인정보 처리방침', 
      description: '개인정보 보호 및 이용약관',
      onClick: () => navigate('/profile/privacy')
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/profile');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">설정</h2>
      <div className="bg-white rounded-xl shadow-sm">
        {settings.map((setting, index) => (
          <button
            key={setting.title}
            onClick={setting.onClick}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
              index !== settings.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="text-left">
              <h3 className="font-medium">{setting.title}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>

      {/* 로그아웃 버튼 */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="w-full mt-4 py-4 text-red-500 bg-white rounded-xl font-medium hover:bg-red-50 transition-colors"
      >
        로그아웃
      </button>

      {/* 로그아웃 모달 */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
};

export default Settings; 