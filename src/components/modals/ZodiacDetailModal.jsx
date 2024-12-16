import { IoClose, IoSparkles, IoStar } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef, useState } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';

const ZodiacDetailModal = ({ isOpen, onClose, zodiac }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { user } = useAuth();
  const modalRef = useRef(null);

  // ESC 키 누를 때 모달 닫기
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // 모달 외부 클릭 시 닫기
  const handleModalClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  // 닫기 버튼 클릭
  const handleCloseClick = useCallback((e) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  // 프리미엄 버튼 클릭
  const handlePremiumClick = useCallback((e) => {
    e.stopPropagation();
    onClose();
    navigate('/profile/premium');
  }, [onClose, navigate]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Early return if modal is not open or zodiac data is not available
  if (!isOpen || !zodiac) return null;

  // 상세 운세 데이터
  const detailFortune = {
    yearlyFortune: {
      '1984년생': '사업과 학업에서 큰 발전이 기대되는 해입니다. 특히 3월과 9월에 좋은 기회가 올 수 있어요.',
      '1996년생': '새로운 도전과 변화가 필요한 시기입니다. 적극적인 자세로 임하면 좋은 결과가 있을 거예요.',
      '2008년생': '학업운이 매우 좋은 해입니다. 집중력이 높아질 수 있어요.',
      '2020년생': '창의력이 돋보이는 시기입니다. 예체능 활동에서 특히 두각을 나타낼 수 있어요.'
    },
    monthlyAdvice: [
      '이번 달은 특히 학습과 자기계발에 좋은 시기입니다.',
      '금전적인 거래나 계약은 신중하게 결정하세요.',
      '가족과의 여행이나 외출이 행운을 가져올 수 있어요.',
      '건강관리에 특히 신경 쓰면 좋은 시기입니다.'
    ],
    luckyItems: {
      '행운의 색상': '로얄 블루',
      '행운의 숫자': '3, 7, 8',
      '행운의 방향': '동남쪽',
      '행운의 시간': '오후 2시 ~ 4시',
      '행운의 장소': '도서관이나 학습공간',
      '행운의 물건': '파란색 필기구'
    }
  };

  // 오늘의 운세 데이터
  const todayFortune = {
    overall: `${zodiac.name}띠의 오늘은 전반적으로 긍정적인 기운이 감지됩니다. 
    특히 오후 시간대에 행운이 더욱 강하게 작용할 것으로 보입니다.`,
    details: [
      {
        title: '오늘의 운세',
        content: '새로운 시도나 도전에 좋은 시기입니다. 주변 사람들과의 소통에서도 좋은 결과를 얻을 수 있어요.',
        isPremium: false
      },
      {
        title: 'AI 운세 분석',
        content: `오늘의 운세 지수는 85점으로 상승세를 보이고 있습니다. 
        특히 학습과 창작 활동에서 뛰어난 성과를 기대할 수 있으며, 
        중요한 결정이나 선택에서도 직감이 빛을 발할 것입니다.`,
        isPremium: !isPremium
      },
      {
        title: '금전운',
        content: '투자나 재테크에 관심을 가져보세요. 예상치 못한 수입이 생길 수 있습니다.',
        isPremium: !isPremium,
        icon: '💰'
      },
      {
        title: '애정운',
        content: '소중한 인연과의 만남이 예상됩니다. 적극적인 자세가 좋은 결과를 가져올 수 있어요.',
        isPremium: !isPremium,
        icon: '💝'
      }
    ]
  };

  // 탭 구성
  const tabs = [
    { id: 'summary', label: '오늘의 운세' },
    { id: 'yearly', label: '년운', premium: true },
    { id: 'lucky', label: '행운', premium: true }
  ];

  // 오늘의 운세 렌더링
  const renderSummaryContent = () => (
    <div className="space-y-6">
      {/* 전체적인 운세 */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {todayFortune.overall}
        </p>
      </div>

      {/* 상세 운��� */}
      <div className="space-y-4">
        {todayFortune.details.map((detail, index) => (
          <div key={index} className="relative">
            <div className={detail.isPremium ? 'blur-sm' : ''}>
              <div className="flex items-center gap-2 mb-2">
                {detail.icon && <span className="text-xl">{detail.icon}</span>}
                <h4 className="font-medium text-gray-900">{detail.title}</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {detail.content}
              </p>
            </div>
            {detail.isPremium && !isPremium && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2">
                  <IoSparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-900">
                    {index === 1 ? 'AI 운세 분석' : '상세 운세'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 프리미엄 유도 배너 */}
      {renderPremiumBanner()}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return renderSummaryContent();

      case 'yearly':
        return isPremium ? (
          <div className="space-y-4">
            {Object.entries(detailFortune.yearlyFortune).map(([year, fortune]) => (
              <div key={year} className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl">
                <div className="font-medium text-primary mb-1">{year}</div>
                <p className="text-sm text-gray-600">{fortune}</p>
              </div>
            ))}
          </div>
        ) : (
          <PremiumLockContent />
        );

      case 'lucky':
        return isPremium ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(detailFortune.luckyItems).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-xl">
                  <span className="text-xs text-gray-500 block mb-1">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 rounded-xl p-4">
              <h4 className="font-medium mb-2">이달의 운세</h4>
              <div className="space-y-2">
                {detailFortune.monthlyAdvice.map((advice, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <IoStar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">{advice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <PremiumLockContent />
        );
    }
  };

  const PremiumLockContent = () => (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <IoSparkles className="w-8 h-8 text-primary" />
      </div>
      <h4 className="font-medium text-gray-900 mb-2">프리미엄 전용</h4>
      <p className="text-sm text-gray-600 mb-4">
        더 자세한 운세 정보를<br />프리미엄에서 확인하세요
      </p>
      <button
        onClick={() => {
          onClose();
          navigate('/profile/premium');
        }}
        className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium"
      >
        프리미엄 시작하기
      </button>
    </div>
  );

  // 프리미엄 유도 배너 렌더링
  const renderPremiumBanner = () => {
    if (!user) {
      return (
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 rounded-xl text-white">
          {/* 비로그인 사용자용 배너 내용 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <IoSparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium mb-1">로그인하고 더 자세한 운세 보기</h4>
              <p className="text-sm text-white/80 mb-3">
                회원가입하고 무료 운세를<br />
                매일 확인해보세요
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="px-4 py-1.5 bg-white text-primary text-sm font-medium rounded-lg"
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!isPremium) {
      return (
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 rounded-xl text-white">
          {/* 일반 회원용 배너 내용 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <IoSparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium mb-1">프리미엄 운세 추천</h4>
              <p className="text-sm text-white/80 mb-3">
                AI가 분석한 맞춤형 운세와<br />
                금전운, 애정운 상세 분석을 확인하세요
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/profile/premium');
                }}
                className="px-4 py-1.5 bg-white text-primary text-sm font-medium rounded-lg"
              >
                프리미엄 시작하기
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleModalClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-[360px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative h-32 bg-gradient-to-br from-primary to-primary-dark p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="text-4xl">{zodiac.emoji}</div>
            <div>
              <h2 className="text-xl font-bold text-white">{zodiac.name}띠</h2>
              <p className="text-sm text-white/80">{zodiac.year}년생</p>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex border-b border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`}
            >
              <span className="flex items-center justify-center gap-1">
                {tab.label}
                {tab.premium && !isPremium && <IoSparkles className="w-3 h-3" />}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ZodiacDetailModal; 