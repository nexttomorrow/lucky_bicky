import NameInput from './components/NameInput';
import NameAnalysis from './components/NameAnalysis';
import StrokeCount from './components/StrokeCount';
import ElementalBalance from './components/ElementalBalance';
import LuckyDirections from './components/LuckyDirections';
import PopularNames from './components/PopularNames';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useState } from 'react';
import { IoSparkles } from 'react-icons/io5';

const NamingPage = () => {
  const { isPremium, namingCredits } = useSubscription();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // 프리미엄 모달 컴포넌트
  const PremiumModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[320px] p-6 text-center">
          {/* ... 모달 내용 ... */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-2">
      {/* 남은 이용권 표시 (프리미엄 사용자) */}
      {isPremium && namingCredits > 0 && (
        <div className="px-4 mb-6">
          <div className="bg-primary/5 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">남은 이용권</span>
            <span className="font-bold text-primary">{namingCredits}회</span>
          </div>
        </div>
      )}

      {/* 작명 서비스 컨텐츠 */}
      <div className="px-4">
        {isPremium ? (
          // 프리미엄 사용자용 UI
          <div>
            <NameInput />
            <NameAnalysis />
            <StrokeCount />
            <ElementalBalance />
            <LuckyDirections />
            <PopularNames />
          </div>
        ) : (
          // 일반 사용자용 UI (프리미엄 유도)
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">프리미엄 작명 서비스</h2>
            <p className="text-gray-600 text-sm mb-6">
              전문가의 분석을 통한<br />
              맞춤형 이름 추천 서비스를 이용해보세요
            </p>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium"
            >
              이용권 구매하기
            </button>
          </div>
        )}
      </div>

      {/* 프리미엄 모달 - 비구독자에게만 표시 */}
      {!isPremium && (
        <PremiumModal 
          isOpen={showPremiumModal} 
          onClose={() => setShowPremiumModal(false)} 
        />
      )}
    </div>
  );
};

export default NamingPage; 