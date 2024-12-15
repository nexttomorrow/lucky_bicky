import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { IoClose } from 'react-icons/io5';

const EditProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    birthdate: '',
    phone: '',
    gender: '',
    interests: []
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        nickname: userData.nickname || '',
        name: userData.name || '',
        birthdate: userData.birthdate || '',
        phone: userData.phone || '',
        gender: userData.gender || '',
        interests: userData.interests || []
      });
    }
  }, [userData]);

  const [loading, setLoading] = useState(false);

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

  const handleTagToggle = (tag) => {
    const newInterests = formData.interests.includes(tag)
      ? formData.interests.filter(t => t !== tag)
      : [...formData.interests, tag];
    
    if (!formData.interests.includes(tag) && newInterests.length > 5) {
      alert('관심 분야는 최대 5개까지 선택 가능합니다.');
      return;
    }
    
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'users', userData.uid), formData);
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 수정 중 오류가 발��했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[360px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">프로필 수정</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* 폼 */}
        <div className="overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
              <div className="flex gap-3">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="sr-only peer"
                  />
                  <div className="text-center py-2 border border-gray-200 rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors cursor-pointer">
                    남성
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="sr-only peer"
                  />
                  <div className="text-center py-2 border border-gray-200 rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors cursor-pointer">
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
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관심 분야 (최대 5개)
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.label)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${formData.interests.includes(tag.label)
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:bg-primary/70"
            >
              {loading ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal; 