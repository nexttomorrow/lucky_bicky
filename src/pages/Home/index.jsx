import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import DailyFortune from './components/DailyFortune';
import LuckyNumbers from './components/LuckyNumbers';
import MarketingBanner from './components/MarketingBanner';
import PopularNames from './components/PopularNames';
import TodayLuckySpots from './components/TodayLuckySpots';
import QuickActions from './components/QuickActions';
import HookingMessage from './components/HookingMessage';

const HomePage = () => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-2">
        <div className="px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">서비스 이용 안내</h1>
          <p className="text-gray-600 mb-6">
            로그인하시면 운세, 로또, 작명 서비스를<br />
            모두 이용하실 수 있습니다.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium"
          >
            로그인하기
          </button>
          <p className="mt-4 text-sm text-gray-500">
            아직 회원이 아니신가요?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary font-medium"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-2">
      <HookingMessage />
      <DailyFortune />
      {!isPremium && (
        <MarketingBanner 
          type="premium"
          title="더 자세한 운세가 궁금하다면?"
          description="AI가 분석한 맞춤형 운세"
          ctaText="프리미엄 이용하기"
        />
      )}
      <LuckyNumbers />
      <PopularNames />
      {!isPremium && (
        <MarketingBanner 
          type="event"
          title="첫 구매 50% 할인"
          description="지금 가입하면 모든 서비스 반값!"
          ctaText="혜택 받기"
          bgColor="bg-gradient-to-r from-purple-500 to-pink-500"
        />
      )}
      <TodayLuckySpots />
      <QuickActions />
    </div>
  );
};

export default HomePage; 