import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { IoPencil } from 'react-icons/io5';
import EditProfileModal from './EditProfileModal';

const UserProfile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('사용자 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.uid]);

  const handleProfileUpdate = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
  };

  if (loading) {
    return (
      <section className="px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!userData) return null;

  const getMembershipLevel = () => {
    // 임시로 무료회원으로 설정. 추후 로직에 따라 변경
    return '무료회원';
  };

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* 프로필 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary font-bold">
                {userData.nickname?.[0]}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData.nickname}</h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
              <div className="mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block">
                {getMembershipLevel()}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="프로필 수정"
          >
            <IoPencil className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 관심 분야 */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">관심 분야</h3>
          <div className="flex flex-wrap gap-2">
            {userData.interests?.map((interest, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* 활동 통계 */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-gray-500">저장된 운세</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-gray-500">저장된 번호</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-gray-500">작명 내역</div>
            </div>
          </div>
        </div>

        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={{ ...userData, uid: user.uid }}
          onUpdate={handleProfileUpdate}
        />
      </div>
    </section>
  );
};

export default UserProfile; 