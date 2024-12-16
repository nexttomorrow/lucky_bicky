import { useState, useEffect } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IoSparkles, IoTrendingUp, IoLocation } from 'react-icons/io5';
import TimeDisplay from './components/TimeDisplay';
import ZodiacFortune from './components/ZodiacFortune';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 운세 카드 컴포넌트 추가
const FortuneCard = ({ title, content, icon }) => (
  <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-5 rounded-xl hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-xl">{icon}</span>
      </div>
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
  </div>
);

// LuckyPlaces 컴포넌트 추가
const LuckyPlaces = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('위치 서비스가 지원되지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        // 실제 API 연동 시 여기서 장소 검색
        setPlaces([
          { name: '스타벅스 강남점', type: '카페', distance: '350m' },
          { name: '교보문고 강남점', type: '서점', distance: '500m' },
          { name: '센트럴파크', type: '공원', distance: '1.2km' }
        ]);
        setLoading(false);
      },
      (error) => {
        console.error('위치 정보 가져오기 실패:', error);
        setError('위치 정보를 가져올 수 없습니다.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      {error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : places.length > 0 ? (
        <div className="space-y-5">
          {places.map((place, index) => (
            <div 
              key={index}
              className={`${
                index !== places.length - 1 ? 'border-b border-gray-100 pb-5' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium mb-1">{place.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{place.type}</span>
                    <span>•</span>
                    <span>{place.distance}</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  추천
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">
            가까운 곳의 행운 가득한 장소를 추천해드립니다.
          </p>
          <button 
            onClick={getCurrentLocation}
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium 
                      hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center justify-center">
              <IoLocation className="w-4 h-4 mr-1.5" />
              {loading ? '검색 중...' : '현재 위치에서 검색하기'}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

// 실시간 데이터 컴포넌트 추가
const RealtimeData = () => {
  const realtimeStats = [
    { label: '현재 운세 지수', value: '82', change: '+3', trend: 'up' },
    { label: '행운 확률', value: '76%', change: '+2.5%', trend: 'up' },
    { label: '금전운 지수', value: '88', change: '-1', trend: 'down' },
    { label: '애정운 지수', value: '85', change: '+4', trend: 'up' }
  ];

  const realtimeUpdates = [
    {
      time: '14:30',
      message: '금전운이 상승세로 전환되었습니다.',
      type: 'money'
    },
    {
      time: '13:45',
      message: '오후 3시에 중요한 결정을 하면 좋은 결과가 있을 것 같아요.',
      type: 'advice'
    },
    {
      time: '12:30',
      message: '애정운이 급상승하고 있습니다.',
      type: 'love'
    },
    {
      time: '11:15',
      message: '건강 관리에 신경 쓰면 좋은 시기입니다.',
      type: 'health'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 실시간 통계 */}
      <div className="grid grid-cols-2 gap-4">
        {realtimeStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={`flex items-center text-sm font-medium
                ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                <IoTrendingUp 
                  className={`w-4 h-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`}
                />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 실시간 업데이트 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <IoSparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">실시간 업데이트</span>
        </div>
        <div className="space-y-4">
          {realtimeUpdates.map((update, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 ${
                index !== realtimeUpdates.length - 1 ? 'border-b border-gray-100 pb-4' : ''
              }`}
            >
              <div className="w-16 text-xs text-gray-500 pt-1">{update.time}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{update.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인기 키워드 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <IoTrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">실시간 인기 키워드</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { text: '행운', count: 128 },
            { text: '성공', count: 96 },
            { text: '사랑', count: 85 },
            { text: '도전', count: 72 },
            { text: '기회', count: 64 },
            { text: '성장', count: 57 }
          ].map((keyword, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 bg-gray-50 rounded-lg flex items-center gap-2"
            >
              <span className="text-sm font-medium text-gray-700">#{keyword.text}</span>
              <span className="text-xs text-primary">{keyword.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FortunePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [activeTab, setActiveTab] = useState('ai');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // 남은 시간 계산 로직 추가
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // 다음 운세 시간 설정 (오전 8시)
      const nextUpdate = new Date(now);
      if (currentHour >= 8) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      }
      nextUpdate.setHours(8, 0, 0, 0);

      // 시간 차이 계산
      const diff = nextUpdate.getTime() - now.getTime();
      
      // 시, 분, 초 계산
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    // 초기 계산
    calculateTimeLeft();
    
    // 1초마다 업데이트
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // 오늘의 운세 컨텐츠 렌더링 함수 수정
  const renderFortuneContent = () => {
    const fortuneItems = [
      { title: '금전운', content: '투자나 재테크에 좋은 기회가 있을 수 있습니다.', icon: '💰' },
      { title: '애정운', content: '소중한 사람과의 관계가 더욱 돈독해질 수 있습니다.', icon: '💝' },
      { title: '건강운', content: '가벼운 운동이나 산책으로 컨디션을 관리해보세요.', icon: '💪' },
      { title: '오늘의 조언', content: '새로운 도전에 망설이지 마세요.', icon: '✨' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-5 rounded-xl">
          <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
            <IoSparkles className="w-5 h-5" />
            오늘의 총운
          </h2>
          <p className="text-gray-700 leading-relaxed">
            오늘은 전반적으로 좋은 기운이 함께합니다. 새로운 시도나 도전에 좋은 결과가 있을 것으로 예상됩니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fortuneItems.map((item, index) => (
            <FortuneCard key={index} {...item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen pb-20">
        {/* 오늘의 운세 - 모든 사용자 접근 가능 */}
        <section className="px-4 pt-4 mb-6">
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <IoSparkles className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">오늘의 운세</h1>
              </div>
              <p className="text-gray-500 mb-4">
                {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
              </p>
              <TimeDisplay timeLeft={timeLeft} />
            </div>
            {renderFortuneContent()}
          </div>
        </section>

        {/* 운세 분석 섹션 - 프리미엄 전용 */}
        {user && (
          <section className="px-4 mb-8">
            <div className="relative">
              <div className={isPremium ? '' : 'blur-sm'}>
                <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                  <IoSparkles className="w-5 h-5 text-primary" />
                  회원님의 운세 분석
                </h2>

                {/* 탭 메뉴와 AI 분석 내용 */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-100">
                    <button
                      onClick={() => setActiveTab('ai')}
                      className={`flex-1 pb-3 text-sm font-medium transition-colors
                        ${activeTab === 'ai' 
                          ? 'text-primary border-b-2 border-primary' 
                          : 'text-gray-400'}`}
                    >
                      AI 분석
                    </button>
                    <button
                      onClick={() => setActiveTab('realtime')}
                      className={`flex-1 pb-3 text-sm font-medium transition-colors
                        ${activeTab === 'realtime' 
                          ? 'text-primary border-b-2 border-primary' 
                          : 'text-gray-400'}`}
                    >
                      실시간 데이터
                    </button>
                  </div>
                </div>

                {activeTab === 'ai' && (
                  <div className="space-y-5">
                    {/* 주간 운세 흐름 차트 */}
                    <FortuneChart />

                    {/* 운세 패턴 & 행운 분석 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl border border-gray-100 p-4">
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1">상승 추세</div>
                          <div className="text-2xl font-bold text-primary">78%</div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">최고 운세일</span>
                            <span className="font-medium">목요일</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">운세 주기</span>
                            <span className="font-medium">3일</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl border border-gray-100 p-4">
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1">행운 지수</div>
                          <div className="text-2xl font-bold text-primary">
                            85<span className="text-sm text-gray-400">/100</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">행운의 시간</span>
                            <span className="font-medium">오후 2시</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">행운의 방향</span>
                            <span className="font-medium">동남쪽</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 행운 요소 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IoSparkles className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">행운의 요소</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: '행운의 방향', value: '동남쪽' },
                          { label: '행운의 색상', value: '로얄 블루' },
                          { label: '행운의 숫자', value: '3, 7, 8' },
                          { label: '행운의 시간', value: '오후 2시' }
                        ].map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                            <div className="font-medium">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI 예측 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <IoSparkles className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">AI 운세 예</span>
                        </div>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-500 text-xs font-medium rounded-lg">
                          신뢰도 92%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        이번 주는 전반적으로 상승세를 보이며, 특히 목요일에 가장 좋은 운세가 예상됩니다. 
                        중요한 일정이나 결정은 오후 2시 ~ 4시 사이에 진행하시면 좋은 결과를 얻을 수 있습니다.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['창의성', '도전', '소통', '직감', '열정'].map((keyword, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'realtime' && (
                  <div className="px-4 mb-8">
                    <RealtimeData />
                  </div>
                )}
              </div>

              {/* 프리미엄 유도 오버레이 */}
              {!isPremium && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                  <div className="text-center bg-white p-6 rounded-2xl shadow-lg max-w-[280px]">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IoSparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 운세 분석</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      AI가 분석한 맞춤형 운세와<br />
                      주간 운세 흐름을 확인해보세요
                    </p>
                    <button
                      onClick={() => navigate('/profile/premium')}
                      className="w-full py-3 bg-primary text-white rounded-xl font-medium"
                    >
                      프리미엄 시작하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 행운의 장소 */}
        <section className="px-4 mb-8">
          <h2 className="font-bold mb-4">행운의 장소</h2>
          <LuckyPlaces />
        </section>

        {/* 띠별 운세 - 마지막에 배치 */}
        <section className="px-4 mb-12">
          <h2 className="font-bold mb-4">띠별 운세</h2>
          <ZodiacFortune />
        </section>
      </div>
    </div>
  );
};

// FortuneChart 컴포넌트 추가
const FortuneChart = () => {
  const chartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [{
      data: [65, 75, 85, 90, 80, 70, 85],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 4,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <IoTrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">주간 운세 흐름</span>
        </div>
        <div className="text-emerald-500 text-sm font-medium">
          전주 대비 12.5% 상승
        </div>
      </div>
      <div className="h-[200px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FortunePage; 