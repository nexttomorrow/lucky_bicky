import DailyFortune from './components/DailyFortune';
import LuckyNumbers from './components/LuckyNumbers';
import MarketingBanner from './components/MarketingBanner';
import PopularNames from './components/PopularNames';
import TodayLuckySpots from './components/TodayLuckySpots';
import QuickActions from './components/QuickActions';
import HookingMessage from './components/HookingMessage';

const HomePage = () => {
  return (
    <div className="space-y-6 pt-2">
      <HookingMessage />
      <DailyFortune />
      <MarketingBanner 
        type="premium"
        title="더 자세한 운세가 궁금하다면?"
        description="AI가 분석한 맞춤형 운세"
        ctaText="프리미엄 이용하기"
      />
      <LuckyNumbers />
      <PopularNames />
      <MarketingBanner 
        type="event"
        title="첫 구매 50% 할인"
        description="지금 가입하면 모든 서비스 반값!"
        ctaText="혜택 받기"
        bgColor="bg-gradient-to-r from-purple-500 to-pink-500"
      />
      <TodayLuckySpots />
      <QuickActions />
    </div>
  );
};

export default HomePage; 