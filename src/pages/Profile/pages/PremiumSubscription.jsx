import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoSparkles, IoStar, IoTicket, IoText } from 'react-icons/io5';
import { useAuth } from '../../../contexts/AuthContext';
import { handleSubscription, SUBSCRIPTION_TYPES } from '../../../utils/subscription';
import { USER_ROLES } from '../../../firebase/auth';

const PremiumSubscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('fortune');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscriptionPlans = {
    fortune: {
      title: '프리미엄 운세',
      description: '운세에 특화된 인공지능이 분석하는 정확한 운세',
      type: SUBSCRIPTION_TYPES.FORTUNE,
      role: USER_ROLES.PREMIUM,
      icon: IoSparkles,
      features: [
        '매일 업데이트되는 상세 운세',
        '시간대별 행운 정보',
        '실시간 1:1 전문가 상담',
        '광고 없는 프리미엄 경험'
      ],
      plans: [
        {
          id: `${SUBSCRIPTION_TYPES.FORTUNE}-1`,
          period: '월간',
          price: '9,900',
          description: '매월 자동 결제'
        },
        {
          id: `${SUBSCRIPTION_TYPES.FORTUNE}-12`,
          period: '연간',
          price: '100,980',
          originalPrice: '118,800',
          description: '연간 결제 (15% 할인)'
        }
      ]
    },
    lotto: {
      title: '프리미엄 로또',
      description: 'AI가 분석한 맞춤형 번호 추천',
      type: SUBSCRIPTION_TYPES.LOTTO,
      role: USER_ROLES.PREMIUM,
      icon: IoTicket,
      features: [
        'AI 기반 번호 추천',
        '당첨 확률 분석',
        '실시간 당첨 알림',
        '당첨금 자동 정산'
      ],
      plans: [
        {
          id: `${SUBSCRIPTION_TYPES.LOTTO}-1`,
          period: '월간',
          price: '19,900',
          description: '매월 자동 결제'
        },
        {
          id: `${SUBSCRIPTION_TYPES.LOTTO}-12`,
          period: '연간',
          price: '190,980',
          originalPrice: '238,800',
          description: '연간 결제 (20% 할인)'
        }
      ]
    },
    combo: {
      title: '프리미엄 패키지',
      description: '모든 프리미엄 기능을 한번에',
      type: SUBSCRIPTION_TYPES.COMBO,
      role: USER_ROLES.VIP,
      icon: IoStar,
      features: [
        '운세 + 로또 모든 기능',
        'VIP 전용 컨텐츠',
        '우선 상담 서비스',
        '전용 매니저 배정'
      ],
      plans: [
        {
          id: `${SUBSCRIPTION_TYPES.COMBO}-1`,
          period: '월간',
          price: '24,900',
          description: '매월 자동 결제'
        },
        {
          id: `${SUBSCRIPTION_TYPES.COMBO}-12`,
          period: '연간',
          price: '249,000',
          originalPrice: '298,800',
          description: '연간 결제 (25% 할인)'
        }
      ]
    },
    naming: {
      title: '작명 서비스',
      description: '전문가의 이름 분석과 추천',
      type: SUBSCRIPTION_TYPES.NAMING,
      role: USER_ROLES.PREMIUM,
      icon: IoText,
      features: [
        '전문가의 이름 분석',
        '획수와 음양오행 분석',
        '발음과 뜻 풀이',
        '사주와의 조화 분석'
      ],
      plans: [
        {
          id: `${SUBSCRIPTION_TYPES.NAMING}-1`,
          credits: 1,
          price: '50,000',
          description: '1회 이용권'
        },
        {
          id: `${SUBSCRIPTION_TYPES.NAMING}-3`,
          credits: 3,
          price: '120,000',
          originalPrice: '150,000',
          description: '3회 이용권 (20% 할인)'
        }
      ]
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !user) return;

    setLoading(true);
    setError(null);

    try {
      const [planType, duration] = selectedPlan.split('-');
      const selectedPlanInfo = subscriptionPlans[selectedCategory];
      const durationNumber = parseInt(duration);

      // 구독 처리 및 등급 업데이트
      await handleSubscription(
        user.uid,
        planType,
        durationNumber,
        selectedPlanInfo.role
      );

      // 성공 메시지 표시 (선택사항)
      alert(
        selectedCategory === 'naming'
          ? `${durationNumber}회 이용권 구매가 완료되었습니다.`
          : '구독이 성공적으로 완료되었습니다.'
      );

      // 구독 성공 후 리다이렉트
      switch (planType) {
        case SUBSCRIPTION_TYPES.FORTUNE:
          navigate('/fortune');
          break;
        case SUBSCRIPTION_TYPES.LOTTO:
          navigate('/lotto');
          break;
        case SUBSCRIPTION_TYPES.COMBO:
          navigate('/');
          break;
        case SUBSCRIPTION_TYPES.NAMING:
          navigate('/naming');
          break;
        default:
          navigate('/profile');
      }
    } catch (error) {
      console.error('구독 처리 실패:', error);
      setError('구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => {
    return subscriptionPlans[selectedCategory];
  };

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
            {Object.entries(subscriptionPlans).map(([category, plan]) => {
              const Icon = plan.icon;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedPlan(null);
                  }}
                  className={`flex-1 py-3 px-2 rounded-xl flex flex-col items-center space-y-1.5 transition-colors
                    ${selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{plan.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* 서비스 소개 */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{getCurrentPlan().title}</h2>
            {selectedCategory === 'combo' && (
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  VIP 등급 자동 부여
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  모든 프리미엄 기능 이용 가능
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {getCurrentPlan().description}
          </p>
          
          <div className="space-y-3">
            {getCurrentPlan().features.map((feature, index) => (
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
          {getCurrentPlan().plans.map((plan) => (
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
          {error && (
            <div className="px-4 mb-4">
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}
          <button 
            disabled={!selectedPlan || loading}
            onClick={handleSubscribe}
            className={`w-full py-4 rounded-xl font-medium transition-colors
              ${selectedPlan 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {loading ? '처리 중...' : selectedCategory === 'naming' ? '구매하기' : '구독하기'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            {selectedCategory === 'naming' 
              ? '구매 후 즉시 이용 가능 • 유효기간 1년'
              : '언제든지 해지 가능 • 부분 환불 가능 • 안전한 결제'}
          </p>
        </div>

        {/* 하단 여백 */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default PremiumSubscription; 