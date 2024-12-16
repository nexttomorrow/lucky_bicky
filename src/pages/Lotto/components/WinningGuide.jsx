import { useState } from 'react';
import { 
  IoSparkles, 
  IoInformationCircle, 
  IoTime, 
  IoWallet, 
  IoCheckmarkCircle,
  IoChevronDown,
  IoTrophy,
  IoWarning
} from 'react-icons/io5';

const WinningGuide = ({ isPremium, onPremiumClick }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const basicGuides = [
    {
      id: 'purchase',
      title: '구매 요령',
      icon: IoWallet,
      content: '한 장당 최대 5게임까지 구매 가능합니다.',
      details: [
        '1게임당 1,000원',
        '현금 또는 카드 결제 가능',
        '만 19세 이상 구매 가능',
        '1인당 1회 최대 10만원까지 구매 가능'
      ]
    },
    {
      id: 'draw',
      title: '추첨 시간',
      icon: IoTime,
      content: '매주 토요일 오후 8시 45분',
      details: [
        'MBC 생방송으로 진행',
        '추첨 직후 홈페이지에서 확인 가능',
        '추첨 결과는 다음날 오전 6시부터 판매점에서 확인 가능',
        '당첨번호와 당첨금은 추첨 직후 문자로 발송 (프리미엄 전용)'
      ]
    }
  ];

  const premiumGuides = [
    {
      id: 'claim',
      title: '당첨금 수령',
      icon: IoTrophy,
      content: '당첨금 지급 청구 기한은 발행일로부터 1년입니다.',
      details: [
        '1등: 로또복권 당첨금 지급청구서 작성 필요',
        '2~5등: 판매점에서 즉시 지급',
        '당첨금 이체 수수료 무료 (프리미엄 전용)',
        '세금 관련 상담 서비스 제공 (프리미엄 전용)'
      ]
    },
    {
      id: 'tax',
      title: '세금 안내',
      icon: IoInformationCircle,
      content: '당첨금에 따라 세금이 차등 적용됩니다.',
      details: [
        '3억원 이하: 22% 세금 부과',
        '3억원 초과: 33% 세금 부과',
        '프리미엄 회원 전용 세무사 상담',
        '절세 가이드 제공'
      ]
    }
  ];

  const renderGuideItem = (guide) => (
    <div 
      key={guide.id}
      className="border-b border-gray-100 last:border-0"
    >
      <button
        onClick={() => setExpandedSection(expandedSection === guide.id ? null : guide.id)}
        className="w-full py-4 flex items-start justify-between"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <guide.icon className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium mb-1">{guide.title}</h3>
            <p className="text-sm text-gray-600">{guide.content}</p>
          </div>
        </div>
        <IoChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
          expandedSection === guide.id ? 'transform rotate-180' : ''
        }`} />
      </button>
      
      {expandedSection === guide.id && (
        <div className="pb-4 pl-11">
          <ul className="space-y-2">
            {guide.details.map((detail, index) => (
              <li 
                key={index}
                className={`flex items-start space-x-2 text-sm ${
                  detail.includes('프리미엄 전용') 
                    ? 'text-primary font-medium' 
                    : 'text-gray-600'
                }`}
              >
                <IoCheckmarkCircle className={`w-4 h-4 mt-0.5 ${
                  detail.includes('프리미엄 전용') 
                    ? 'text-primary' 
                    : 'text-gray-400'
                }`} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <section className="px-4 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IoInformationCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">당첨 가이드</h2>
          </div>
          {isPremium && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              프리미엄
            </span>
          )}
        </div>

        {/* 기본 가이드 */}
        <div className="space-y-2">
          {basicGuides.map(renderGuideItem)}
        </div>

        {/* 프리미엄 가이드 */}
        {isPremium ? (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {premiumGuides.map(renderGuideItem)}
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <IoSparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">프리미엄 가이드</h3>
                <p className="text-xs text-gray-500 mb-3">
                  더 자세한 당첨금 수령 방법과<br />
                  세금 안내를 확인해보세요
                </p>
                <button
                  onClick={onPremiumClick}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  프리미엄 시작하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 주의사항 */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-xl">
            <IoWarning className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium mb-1">과도한 복권 구매는 도박중독의 원인이 될 수 있습니다.</p>
              <p className="text-xs">
                복권 중독 예방 상담: 국번없이 1336
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinningGuide; 