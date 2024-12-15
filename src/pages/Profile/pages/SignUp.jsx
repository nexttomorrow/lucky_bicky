import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { signUp } from '../../../firebase/auth';

const INTEREST_TAGS = [
  { id: 1, label: '운세' },
  { id: 2, label: '타로' },
  { id: 3, label: '사주' },
  { id: 4, label: '로또' },
  { id: 5, label: '주식' },
  { id: 6, label: '부동산' },
  { id: 7, label: '연애운' },
  { id: 8, label: '취업운' },
  { id: 9, label: '건강운' },
  { id: 10, label: '학업운' },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    gender: '',
    birthdate: '',
    phone: '',
    referralCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const validateForm = () => {
    // 필수 필드 검사
    if (!formData.email?.trim()) {
      throw new Error('이메일을 입력해주세요.');
    }
    if (!formData.password?.trim()) {
      throw new Error('비밀번호를 입력해주세요.');
    }
    if (!formData.name?.trim()) {
      throw new Error('이름을 입력해주세요.');
    }
    if (!formData.nickname?.trim()) {
      throw new Error('닉네임을 입력해주세요.');
    }
    if (!formData.gender) {
      throw new Error('성별을 선택해주세요.');
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('유효한 이메일 주소를 입력해주세요.');
    }

    // 비밀번호 검사
    if (formData.password.length < 6) {
      throw new Error('비밀번호는 6자리 이상이어야 합니다.');
    }

    // 비밀번호 확인 검사
    if (formData.password !== formData.passwordConfirm) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 전화번호 형식 검사 (선택적)
    if (formData.phone) {
      const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
      if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
        throw new Error('유효한 휴대폰 번호를 입력해주세요.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      validateForm();
      
      // 회원가입 요청 전 데이터 정리
      const signUpData = {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        nickname: formData.nickname.trim(),
        birthdate: formData.birthdate,
        phone: formData.phone?.trim(),
        interests: selectedTags.map(tag => tag.label),
        referralCode: formData.referralCode?.trim()
      };

      console.log('회원가입 요청 데이터:', signUpData); // 디버깅용

      const user = await signUp(signUpData);
      console.log('회원가입 성공:', user); // 디버깅용

      alert('회원가입이 완료되었습니다. 이메일 인증을 진행해주세요.');
      navigate('/profile');
      
    } catch (error) {
      console.error('회원가입 에러:', error); // 디버깅용
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold ml-2">회원가입</h1>
      </div>

      {error && (
        <div className="px-4 mb-4">
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-4 space-y-6">
        {/* 기본 정보 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-primary mb-4">기본 정보</h2>
          
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="8자 이상의 영문, 숫자, 특수문자"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="비밀번호 재입력"
              required
            />
          </div>
        </section>

        {/* 개인 정보 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-primary mb-4">개인 정보</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
            <div className="flex gap-3">
              <label className="flex-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="sr-only peer"
                />
                <div className="text-center py-3 border border-gray-200 rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors cursor-pointer">
                  남성
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="sr-only peer"
                />
                <div className="text-center py-3 border border-gray-200 rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors cursor-pointer">
                  여성
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
            <input
              type="date"
              value={formData.birthdate}
              onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="010-0000-0000"
              required
            />
          </div>
        </section>

        {/* 관심사 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-4">관심사 (최대 5개)</h2>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                  ${selectedTags.length >= 5 && !selectedTags.includes(tag)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {/* 추천인 섹션 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-4">추천인 코드 (선택)</h2>
          <input
            type="text"
            value={formData.referralCode}
            onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="추천인 코드를 입력해주세요"
          />
        </section>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 bg-primary text-white rounded-xl font-medium 
            transition-colors mb-8 relative
            ${loading ? 'bg-primary/70' : 'hover:bg-primary-dark'}`}
        >
          {loading ? (
            <>
              <span className="opacity-0">가입하기</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            </>
          ) : (
            '가입하기'
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp; 