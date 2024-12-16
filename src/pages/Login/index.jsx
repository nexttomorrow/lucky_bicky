import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMail, IoLockClosed, IoLogoGoogle } from 'react-icons/io5';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/', { replace: true });
    } catch (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/', { replace: true });
    } catch (error) {
      setError('Google 로그인에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        <div className="px-4 pt-8">
          <h1 className="text-2xl font-bold mb-8 text-center">로그인</h1>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl 
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="이메일 주소를 입력하세요"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium
                       hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white border border-gray-200 rounded-xl font-medium
                       hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <IoLogoGoogle className="w-5 h-5 text-primary" />
              Google로 계속하기
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            아직 회원이 아니신가요?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary font-medium hover:underline"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 