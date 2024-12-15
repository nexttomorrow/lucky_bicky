import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoSparkles, IoStar, IoTicket, IoText } from 'react-icons/io5';

const PremiumSubscription = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('fortune');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const categories = [
    { id: 'fortune', label: '운세', icon: IoSparkles },
    { id: 'lotto', label: '로또', icon: IoTicket },
    { id: 'combo', label: '패키지', icon: IoStar },
    { id: 'naming', label: '작명', icon: IoText },
  ];

  const subscriptionPlans = {
    fortune: {
      title: '프리미엄 운세 (사주)',
      description: '운세에 특화된 인공지능이 분석하는 정확한 운세',
      features: [
        '매일 업데이트되는 상세 운세',
        '사주와 궁합 심층 분석',
        '실시간 1:1 전문가 상담',
        '광고 없는 프리미엄 경험'
      ],
      plans: [
        {
          id: 'fortune-monthly',
          period: '월간',
          price: '9,900',
          description: '매월 자동 결제'
        },
        {
          id: 'fortune-yearly',
          period: '연간',
          price: '100,980',
          originalPrice: '118,800',
          description: '연간 결제 (15% 할인)'
        }
      ]
    },
    lotto: {
      title: '프리미엄 로또번호',
      description: '로또 당첨 패턴을 학습한 AI의 정교한 번호 추천',
      features: [
        'AI 기반 맞춤형 번호 추천',
        '당첨 확률 상세 분석',
        '주별 당첨 패턴 리포트',
        '프리미엄 번호 생성기'
      ],
      plans: [
        {
          id: 'lotto-monthly',
          period: '월간',
          price: '19,900',
          description: '매월 자동 결제'
        },
        {
          id: 'lotto-yearly',
          period: '연간',
          price: '203,000',
          originalPrice: '238,800',
          description: '연간 결제 (15% 할인)'
        }
      ]
    },
    combo: {
      title: '프리미엄 패키지',
      description: '운세와 로또 서비스를 모두 이용하는 완벽한 선택',
      features: [
        '모든 프리미엄 운세 기능',
        '모든 프리미엄 로또 기능',
        '전용 고객센터 지원',
        'VIP 전용 이벤트 참여'
      ],
      plans: [
        {
          id: 'combo-monthly',
          period: '월간',
          price: '24,900',
          description: '매월 자동 결제'
        },
        {
          id: 'combo-yearly',
          period: '연간',
          price: '254,000',
          originalPrice: '298,800',
          description: '연간 결제 (15% 할인)'
        }
      ]
    },
    naming: {
      title: '프리미엄 작명',
      description: '전통과 현대를 아우르는 AI 기반 작명 서비스',
      features: [
        '사주 기반 이름 추천',
        '한자 음양오행 분석',
        '획수 및 발음 분석',
        '상세 작명 보고서'
      ],
      plans: [
        {
          id: 'naming-single',
          count: 1,
          price: '50,000',
          description: '1회 이용권'
        },
        {
          id: 'naming-three',
          count: 3,
          price: '120,000',
          originalPrice: '150,000',
          description: '3회 이용권 (20% 할인)'
        },
        {
          id: 'naming-five',
          count: 5,
          price: '190,000',
          originalPrice: '250,000',
          description: '5회 이용권 (24% 할인)'
        }
      ]
    }
  };

  const currentPlan = subscriptionPlans[selectedCategory];

  return (
    <div className="min-h-screen bg-white pt-2">
      {/* 헤더 */}
      <div className="border-b border-gray-100">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">프리미엄 서비스</h1>
        </div>

        {/* 카테고리 선택 */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedCategory(id);
                  setSelectedPlan(null);
                }}
                className={`flex-1 py-3 px-2 rounded-xl flex flex-col items-center space-y-1.5 transition-colors
                  ${selectedCategory === id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* 서비스 소��� */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{currentPlan.title}</h2>
            {selectedCategory === 'combo' && (
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  가장 인기있는 구독
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  월 5,000원 더 저렴해요!
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{currentPlan.description}</p>
          
          <div className="space-y-3">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 요금제 선택 */}
        <section className="space-y-3">
          {currentPlan.plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative w-full p-5 rounded-2xl border transition-all
                ${selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-100 hover:border-gray-200 bg-white'}`}
            >
              {plan.originalPrice && (
                <div className="absolute -top-2.5 -right-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  {Math.round((1 - parseInt(plan.price.replace(/,/g, '')) / parseInt(plan.originalPrice.replace(/,/g, ''))) * 100)}% 할인
                </div>
              )}

              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 transition-colors ${
                  selectedPlan === plan.id
                    ? 'border-primary bg-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedPlan === plan.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₩{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₩{plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  
                  {plan.period === '연간' && (
                    <div className="mt-2 py-2 px-3 bg-primary/5 rounded-lg">
                      <p className="text-xs text-primary font-medium">
                        월 ₩{Math.round(parseInt(plan.price.replace(/,/g, '')) / 12).toLocaleString()}원으로 이용하기
                      </p>
                      <div className="flex gap-2 mt-1.5">
                        <span className="text-xs text-gray-500">• VIP 이벤트 참여</span>
                        <span className="text-xs text-gray-500">• 프리미엄 지원</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* 구독하기 버튼 */}
        <div className="bg-white pt-4">
          <button 
            disabled={!selectedPlan}
            className={`w-full py-4 rounded-xl font-medium transition-colors
              ${selectedPlan 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {selectedCategory === 'naming' ? '구매하기' : '구독하기'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            언제든지 해지 가능 • 부분 환불 가능 • 안전한 결제
          </p>
        </div>

        {/* 하단 여백 */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default PremiumSubscription; 