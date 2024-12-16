import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { IoSparkles } from 'react-icons/io5';

const NamingPage = () => {
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        {/* 작명 입력 섹션 */}
        <section className="px-4 pt-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">AI 작명</h1>
              <p className="text-gray-500">
                AI가 분석하여 의미 있는 이름을 추천해드립니다
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  성씨
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="성씨를 입력하세요 (예: 김)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  생년월일
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  성별
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 border border-gray-200 rounded-xl font-medium
                                   hover:border-primary hover:text-primary transition-colors">
                    남자
                  </button>
                  <button className="py-3 border border-gray-200 rounded-xl font-medium
                                   hover:border-primary hover:text-primary transition-colors">
                    여자
                  </button>
                </div>
              </div>

              <button
                className="w-full py-3 bg-primary text-white rounded-xl font-medium
                         hover:bg-primary-dark transition-colors"
              >
                이름 추천받기
              </button>
            </div>
          </div>
        </section>

        {/* 프리미엄 배너 */}
        {!isPremium && (
          <section className="px-4 mb-6">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">프리미엄 작명</h3>
                  <p className="text-sm opacity-90 mb-4">
                    AI가 분석한 더 자세한 이름 풀이와<br />
                    다양한 이름 추천을 받아보세요
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

export default NamingPage; 