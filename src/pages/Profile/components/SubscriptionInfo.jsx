import { useSubscription } from '../../../contexts/SubscriptionContext';
import { IoSparkles, IoTime } from 'react-icons/io5';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const SubscriptionInfo = () => {
  const { subscription, getRemainingDays, isPremium, isVIP, namingCredits } = useSubscription();

  if (!isPremium) return null;

  return (
    <section className="px-4 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <IoSparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">구독 정보</h2>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            isVIP 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-primary/10 text-primary'
          }`}>
            {isVIP ? 'VIP' : '프리미엄'}
          </span>
        </div>

        <div className="space-y-4">
          {/* 구독 상태 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">현재 플랜</span>
            <span className="font-medium">{subscription.plan}</span>
          </div>

          {/* 남은 기간 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">남은 기간</span>
            <div className="flex items-center text-primary">
              <IoTime className="w-4 h-4 mr-1" />
              <span className="font-medium">{getRemainingDays()}일</span>
            </div>
          </div>

          {/* 만료일 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">만료일</span>
            <span className="font-medium">
              {format(subscription.endDate, 'yyyy년 M월 d일', { locale: ko })}
            </span>
          </div>

          {/* 작명 이용권 */}
          {namingCredits > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">작명 이용권</span>
              <span className="font-medium">{namingCredits}회</span>
            </div>
          )}
        </div>

        {/* 자동 갱신 안내 */}
        {subscription.autoRenewal && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <IoSparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p>
                다음 결제일은 {format(subscription.nextPaymentDate, 'yyyy년 M월 d일', { locale: ko })} 입니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionInfo; 