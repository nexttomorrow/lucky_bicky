import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoSparkles, 
  IoTrendingUp, 
  IoAnalytics, 
  IoLocation, 
  IoBook,
  IoSave 
} from 'react-icons/io5';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import NumberGenerator from './components/NumberGenerator';
import WinningHistory from './components/WinningHistory';
import LuckySpots from './components/LuckySpots';
import Statistics from './components/Statistics';
import WinningGuide from './components/WinningGuide';

const LottoPage = () => {
  const navigate = useNavigate();
  const { isPremium, loading } = useSubscription();
  const { user } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // 로또 번호 기록하기 함수
  const saveLottoNumbers = async (numbers) => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      const userLottoRef = doc(db, 'lottoHistory', user.uid);
      const docSnap = await getDoc(userLottoRef);

      const newLottoRecord = {
        numbers,
        timestamp: new Date(),
        type: 'AI 추천번호'
      };

      if (docSnap.exists()) {
        await updateDoc(userLottoRef, {
          records: arrayUnion(newLottoRecord)
        });
      } else {
        await setDoc(userLottoRef, {
          records: [newLottoRecord]
        });
      }

      alert('로또 번호가 저장되었습니다.');
    } catch (error) {
      console.error('로또 번호 저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        {/* AI 추천 번호 섹션 */}
        <section className="px-4 pt-4 mb-8">
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <IoSparkles className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">AI 번호 추천</h1>
              </div>
              <p className="text-gray-500">
                AI가 분석한 맞춤형 번호를 추천해드립니다
              </p>
            </div>

            <NumberGenerator 
              isPremium={isPremium} 
              onPremiumClick={() => setShowPremiumModal(true)}
              onSave={saveLottoNumbers}
            />
          </div>
        </section>

        {/* 당첨 내역 섹션 */}
        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <IoTrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">당첨 내역</h2>
                <p className="text-xs text-gray-500">최근 당첨 결과를 확인해보세요</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <WinningHistory isPremium={isPremium} />
          </div>
        </section>

        {/* 통계 섹션 */}
        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <IoAnalytics className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">당첨 분석</h2>
                <p className="text-xs text-gray-500">AI가 분석한 당첨 패턴</p>
              </div>
            </div>
          </div>
          {isPremium ? (
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <Statistics />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl">
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <IoSparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">프리미엄 전용</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI가 분석한 상세한 통계 정보를<br />
                  프리미엄 서비스에서 확인해보세요
                </p>
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="px-6 py-2.5 bg-white text-primary rounded-xl text-sm font-medium shadow-sm"
                >
                  자세히 보기
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 행운의 장소 섹션 */}
        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <IoLocation className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">행운의 장소</h2>
                <p className="text-xs text-gray-500">근처의 행운이 가득한 장소</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <LuckySpots isPremium={isPremium} onPremiumClick={() => setShowPremiumModal(true)} />
          </div>
        </section>

        {/* 당첨 가이드 섹션 */}
        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <IoBook className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">당첨 가이드</h2>
                <p className="text-xs text-gray-500">당첨 확률을 높이는 방법</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <WinningGuide isPremium={isPremium} onPremiumClick={() => setShowPremiumModal(true)} />
          </div>
        </section>

        {/* 프리미엄 모달 - Fortune 페이지와 동일한 스타일 */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-[340px] p-5 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoSparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">프리미엄 로또 서비스</h2>
              <p className="text-gray-600 text-sm mb-6">
                AI가 분석한 맞춤형 번호 추천과<br />
                상세한 당첨 분석을 확인해보세요
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPremiumModal(false);
                    navigate('/profile/premium');
                  }}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium"
                >
                  프리미엄 구독하기
                </button>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full py-3 text-gray-500"
                >
                  다음에 할게요
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LottoPage; 