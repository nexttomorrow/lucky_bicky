import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, resetPassword } from '../../../firebase/auth';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const validateForm = () => {
    if (!formData.email?.trim()) {
      throw new Error('이메일을 입력해주세요.');
    }
    if (!resetMode && !formData.password?.trim()) {
      throw new Error('비밀번호를 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('유효한 이메일 주소를 입력해주세요.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      validateForm();

      if (resetMode) {
        // 비밀번호 재설정 이메일 발송
        await resetPassword(formData.email);
        alert('비밀번호 재설정 이메일이 발송되었습니다.');
        setResetMode(false);
      } else {
        // 로그인 시도
        console.log('로그인 시도:', formData.email);
        const user = await signIn(formData.email, formData.password);
        
        if (!user.emailVerified) {
          throw new Error('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
        }

        console.log('로그인 성공:', user);
        onLogin(user);
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-6">
          {resetMode ? '비밀번호 재설정' : '로그인'}
        </h2>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="example@email.com"
              required
            />
          </div>
          
          {!resetMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="********"
                required
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-primary text-white rounded-xl font-medium 
              transition-colors relative
              ${loading ? 'bg-primary/70' : 'hover:bg-primary-dark'}`}
          >
            {loading ? (
              <>
                <span className="opacity-0">{resetMode ? '이메일 발송' : '로그인'}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              </>
            ) : (
              resetMode ? '이메일 발송' : '로그인'
            )}
          </button>

          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={() => setResetMode(!resetMode)}
              className="text-gray-500 hover:text-primary"
            >
              {resetMode ? '로그인으로 돌아가기' : '비밀번호를 잊으셨나요?'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile/signup')}
              className="text-gray-500 hover:text-primary"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm; 