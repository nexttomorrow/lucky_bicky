import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';
import { IoSparkles } from 'react-icons/io5';
import LuckyNumbers from './components/LuckyNumbers';
import TodayFortune from './components/TodayFortune';

const HomePage = () => {
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        {/* 오늘의 운세 */}
        <section className="px-4 pt-4 mb-6">
          <TodayFortune />
        </section>

        {/* 행운의 번호 */}
        <section className="px-4 mb-6">
          <LuckyNumbers />
        </section>

        {/* 프리미엄 배너 - 비프리미엄 사용자에게만 표시 */}
        {!isPremium && (
          <section className="px-4 mb-6">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">프리미엄 서비스</h3>
                  <p className="text-sm opacity-90 mb-4">
                    더 자세한 운세와 개인 맞춤 분석을<br />
                    지금 바로 만나보세요
                  </p>
                  <button
                    onClick={() => navigate('/profile/premium')}
                    className="px-6 py-2 bg-white text-primary rounded-xl font-medium
                             hover:bg-gray-50 transition-colors"
                  >
                    자세히 보기
                  </button>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <IoSparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage; 