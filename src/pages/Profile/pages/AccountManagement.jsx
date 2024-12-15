import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const AccountManagement = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직 구현
  };

  return (
    <div className="min-h-screen bg-white pt-2">
      <div className="flex items-center px-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-2">계정 관리</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* 비밀번호 변경 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-6">비밀번호 변경</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                현재 비밀번호
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                새 비밀번호
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              비밀번호 변경
            </button>
          </form>
        </section>

        {/* 계정 삭제 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-red-500 mb-2">계정 삭제</h2>
          <p className="text-sm text-gray-500 mb-4">
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </p>
          <button
            className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-medium hover:bg-red-100 transition-colors"
          >
            계정 삭제
          </button>
        </section>
      </div>
    </div>
  );
};

export default AccountManagement; 