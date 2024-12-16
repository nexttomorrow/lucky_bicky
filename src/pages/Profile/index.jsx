import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserProfile from './components/UserProfile';
import MenuSection from './components/MenuSection';
import Settings from './components/Settings';
import LoginForm from './components/LoginForm';
import SubscriptionInfo from './components/SubscriptionInfo';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [lottoHistory, setLottoHistory] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchLottoHistory = async () => {
      if (!user) return;

      try {
        const lottoRef = doc(db, 'lottoHistory', user.uid);
        const docSnap = await getDoc(lottoRef);

        if (docSnap.exists()) {
          const { records } = docSnap.data();
          setLottoHistory(records.sort((a, b) => b.timestamp - a.timestamp));
        }
      } catch (error) {
        console.error('로또 기록 조회 실패:', error);
      }
    };

    fetchLottoHistory();
  }, [user]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        <div className="space-y-6 pt-2">
          {isLoggedIn && user ? (
            <>
              <UserProfile user={user} />
              <SubscriptionInfo />
              <MenuSection items={menuItems} />
              
              {/* 로또 번호 기록 */}
              <section className="px-4 mb-8">
                <h2 className="font-bold mb-4">로또 번호 기록</h2>
                <div className="space-y-4">
                  {lottoHistory.map((record, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-2xl border border-gray-100 p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-sm text-gray-500">
                            {new Date(record.timestamp.seconds * 1000).toLocaleDateString()}
                          </span>
                          <div className="text-sm font-medium text-primary mt-1">
                            {record.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {record.numbers.map((number, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center
                                     text-sm font-medium text-primary"
                          >
                            {number}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {lottoHistory.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      저장된 로또 번호가 없습니다.
                    </div>
                  )}
                </div>
              </section>

              <Settings />
            </>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;