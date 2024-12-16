import { useState, useEffect } from 'react';
import { IoSparkles, IoTrophy, IoCalendarOutline, IoTrendingUp } from 'react-icons/io5';

const WinningHistory = ({ isPremium }) => {
  const [recentWinnings, setRecentWinnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' | 'stats'

  useEffect(() => {
    const fetchWinningHistory = async () => {
      setLoading(true);
      try {
        // 실제로는 API에서 데이터를 가져옴
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecentWinnings([
          {
            round: 1234,
            date: '2024-02-24',
            numbers: [1, 15, 23, 29, 37, 42],
            bonus: 45,
            prize: '23억',
            winners: 12,
            totalPrize: '276억',
            matchedNumbers: 3, // 사용자가 맞춘 번호 수
            userNumbers: [1, 15, 23, 8, 11, 33] // 사용자가 선택한 번호
          },
          {
            round: 1233,
            date: '2024-02-17',
            numbers: [5, 12, 25, 32, 40, 43],
            bonus: 30,
            prize: '19억',
            winners: 8,
            totalPrize: '152억',
            matchedNumbers: 4,
            userNumbers: [5, 12, 25, 32, 9, 16]
          },
          // ... 더 많은 당첨 내역
        ]);
      } catch (error) {
        console.error('당첨 내역 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinningHistory();
  }, []);

  if (loading) {
    return (
      <section className="px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const renderWinningNumbers = (numbers, bonus, matchedNumbers = []) => (
    <div className="flex items-center space-x-2">
      {numbers.map((num, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${matchedNumbers.includes(num)
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700'}`}
        >
          {num}
        </div>
      ))}
      <span className="text-gray-400 mx-1">+</span>
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
        {bonus}
      </div>
    </div>
  );

  const renderPremiumStats = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4">
        <h3 className="font-medium mb-3 flex items-center">
          <IoTrendingUp className="w-4 h-4 mr-2 text-primary" />
          당첨 통계
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">12회</div>
            <div className="text-xs text-gray-500">참여 횟수</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">4개</div>
            <div className="text-xs text-gray-500">최고 적중</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">33%</div>
            <div className="text-xs text-gray-500">적중률</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-medium mb-3">당첨금 현황</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">총 당첨금</span>
            <span className="font-medium">125,000원</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">최고 당첨금</span>
            <span className="font-medium">50,000원</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl shadow-sm">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IoTrophy className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">당첨 내역</h2>
          </div>
          {isPremium && (
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('recent')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${viewMode === 'recent'
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-600'}`}
              >
                최근 내역
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${viewMode === 'stats'
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-600'}`}
              >
                통계
              </button>
            </div>
          )}
        </div>

        {/* 컨텐츠 */}
        {viewMode === 'recent' ? (
          <div className="space-y-4">
            {recentWinnings.map((winning) => (
              <div key={winning.round} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{winning.round}회</span>
                    <span className="text-xs text-gray-500">
                      <IoCalendarOutline className="inline-block w-3 h-3 mr-1" />
                      {winning.date}
                    </span>
                  </div>
                  <span className="text-primary font-medium">{winning.prize}</span>
                </div>
                {renderWinningNumbers(winning.numbers, winning.bonus, winning.userNumbers)}
                {isPremium && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1등 당첨자: {winning.winners}명</span>
                      <span>총 당첨금: {winning.totalPrize}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          renderPremiumStats()
        )}

        {/* 프리미엄 안내 */}
        {!isPremium && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <IoSparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">프리미엄 기능</h3>
                <p className="text-xs text-gray-500 mb-3">
                  더 자세한 당첨 내역과 통계 분석을 확인해보세요
                </p>
                <button
                  onClick={() => {/* 프리미엄 모달 표시 */}}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  프리미엄 시작하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WinningHistory; 