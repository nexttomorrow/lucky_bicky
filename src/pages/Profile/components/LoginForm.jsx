import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-6">로그인</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input 
              type="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input 
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="********"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            로그인
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/profile/signup')}
              className="text-sm text-gray-500 hover:text-primary"
            >
              아직 회원이 아니신가요?
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm; 