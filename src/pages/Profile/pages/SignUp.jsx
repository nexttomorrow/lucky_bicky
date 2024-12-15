import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

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
    birthdate: '',
    phone: '',
    referralCode: '',
  });

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
    console.log(formData, selectedTags);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-2">
      <div className="flex items-center px-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-2">회원가입</h1>
      </div>

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
          className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors mb-8"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignUp; 