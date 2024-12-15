import { useState, useEffect } from 'react';
import { getUserFortune } from '../../firebase/fortune';
import { useAuth } from '../../contexts/AuthContext';
import { format, differenceInHours, differenceInMinutes, setHours, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IoTime, IoSparkles, IoStar, IoLocation, IoNavigate, IoWalk } from 'react-icons/io5';
import ZodiacDetailModal from '../../components/modals/ZodiacDetailModal';
import { useNavigate } from 'react-router-dom';
import LuckyItemModal from '../../components/modals/LuckyItemModal';

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
        searchNearbyPlaces(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('위치 정보 가져오기 실패:', error);
        setError('위치 정보를 가져올 수 없습니다.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // 카카오 지도 API를 사용하여 주변 장소 검색
  const searchNearbyPlaces = async (latitude, longitude) => {
    try {
      // 카카오, 음식점, 문화시설 등 다양한 카테고리 검색
      const categories = ['CE7', 'FD6', 'CT1'];
      const results = [];

      for (const category of categories) {
        const response = await fetch(
          `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category}&radius=1000&x=${longitude}&y=${latitude}&sort=distance`,
          {
            headers: {
              'Authorization': `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error('API 응답:', errorData);
          throw new Error(`API 요청 실패: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.documents) {
          results.push(...data.documents);
        }
      }

      // 거리순으로 정렬하고 상위 3개만 선택
      const formattedPlaces = results
        .sort((a, b) => parseInt(a.distance) - parseInt(b.distance))
        .slice(0, 3)
        .map(place => ({
          type: getPlaceType(place.category_name),
          name: place.place_name,
          distance: `${Math.round(parseInt(place.distance))}m`,
          walkTime: `${Math.round(parseInt(place.distance) / 67)}분`,
          luck: getLuckyMessage(place.category_name),
          icon: getPlaceIcon(place.category_name),
          openTime: '영업중',
          address: place.road_address_name || place.address_name,
          placeUrl: place.place_url
        }));

      setPlaces(formattedPlaces);
    } catch (error) {
      console.error('장소 검색 실패:', error);
      setError('주변 장소를 검색하는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      
      // 임시 데이터로 대체 (API 호출 실패 시)
      const fallbackPlaces = [
        {
          type: '카페',
          name: '스타벅스 강남점',
          distance: '350m',
          walkTime: '5분',
          luck: '오늘은 이곳에서 좋은 영감을 얻을 수 있어요',
          icon: IoSparkles,
          openTime: '07:00 - 22:00',
          address: '서울 강남구 테헤란로 123',
          placeUrl: 'https://map.kakao.com'
        },
        {
          type: '맛집',
          name: '맛있는 식당',
          distance: '500m',
          walkTime: '7분',
          luck: '맛있는 식사가 행운을 불러올 거예요',
          icon: IoSparkles,
          openTime: '11:00 - 21:00',
          address: '서울 강남구 역삼로 456',
          placeUrl: 'https://map.kakao.com'
        },
        {
          type: '문화공간',
          name: '강남 도서관',
          distance: '800m',
          walkTime: '12분',
          luck: '새로운 영감을 얻을 수 있는 곳이에요',
          icon: IoStar,
          openTime: '09:00 - 18:00',
          address: '서울 강남구 도서로 789',
          placeUrl: 'https://map.kakao.com'
        }
      ];
      
      setPlaces(fallbackPlaces);
    }
  };

  // 장소 유형 분류 개선
  const getPlaceType = (category) => {
    if (!category) return '추천 장소';
    
    if (category.includes('카페')) return '카페';
    if (category.includes('음식점')) return '맛집';
    if (category.includes('문화시설')) return '문화공간';
    if (category.includes('서점')) return '서점';
    if (category.includes('공원')) return '공원';
    
    const mainCategory = category.split(' > ')[0];
    return mainCategory || '추천 장소';
  };

  // 장소 유형별 아이콘 개선
  const getPlaceIcon = (category) => {
    const type = getPlaceType(category);
    switch (type) {
      case '공원':
        return IoStar;
      case '맛집':
        return IoSparkles;
      case '문화공간':
        return IoSparkles;
      default:
        return IoSparkles;
    }
  };

  // 장소 유형에 따른 운 메시지 생성 개선
  const getLuckyMessage = (category) => {
    const messages = {
      카페: [
        '오늘은 이곳에서 좋은 영감을 얻을 수 있어요',
        '특별한 만남이 기다리고 있을지도 몰라요',
        '여유로운 시간이 행운을 가져다줄 거예요'
      ],
      맛집: [
        '맛있는 식사가 행운을 불러올 거예요',
        '좋은 사람과 함께하면 더 즐거울 거예요',
        '새로운 맛의 발견이 기다리고 있어요'
      ],
      문화공간: [
        '문화생활이 행운을 가져다줄 거예요',
        '새로운 영감을 얻을 수 있는 곳이에요',
        '특��한 경험이 기다리고 있어요'
      ],
      공원: [
        '자연과 함께하는 시간이 행운을 가져올 거예요',
        '산책하며 좋은 생각이 떠오를 거예요',
        '맑은 공기가 긍정적인 기운을 줄 거예요'
      ]
    };

    const type = getPlaceType(category);
    const messageList = messages[type] || messages['카페'];
    return messageList[Math.floor(Math.random() * messageList.length)];
  };

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">오늘의 행운 장소</h2>
      <div className="border border-gray-100 rounded-2xl p-6">
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
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/5 rounded-full">
                        {place.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {place.openTime}
                      </span>
                    </div>
                    <h3 className="font-medium mt-1">{place.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{place.address}</p>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center">
                        <IoWalk className="w-4 h-4 mr-1" />
                        {place.distance}
                      </span>
                      <span className="flex items-center">
                        <IoTime className="w-4 h-4 mr-1" />
                        {place.walkTime}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="flex items-center justify-center w-8 h-8 bg-primary/5 rounded-full hover:bg-primary/10 transition-colors"
                    onClick={() => window.open(place.placeUrl)}
                  >
                    <IoNavigate className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-start">
                    <IoSparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-600">{place.luck}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getPlaceRecommendation(place.type)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="py-6">
              <p className="text-gray-500">가까운 곳의 행운 가득한 장소를 추천해드립니다.</p>
              <button 
                onClick={getCurrentLocation}
                disabled={loading}
                className="mt-4 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium 
                          hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              >
                <div className="flex items-center justify-center">
                  <IoLocation className="w-4 h-4 mr-1.5" />
                  {loading ? '검색 중...' : '현재 위치에서 검색하기'}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// 장소별 추천 이유를 반환하는 함수 추가
const getPlaceRecommendation = (type) => {
  const recommendations = {
    카페: "조용한 분위기에서 생각을 정리하고 영감을 얻기 좋은 공간입니다.",
    맛집: "맛있는 식사와 함께 좋은 기운을 채울 수 있는 곳입니다.",
    문화공간: "새로운 경험과 지식을 통해 긍정적인 에너지를 얻을 수 있습니다.",
    서점: "책 속에서 지혜와 통찰을 발견할 수 있는 별한 공간입니다.",
    공원: "자연과 함께 마음의 평화를 찾을 수 있는 최적의 장소입니다.",
    '추천 장소': "오늘 하루 특별한 행운이 기다리고 있는 곳입니다."
  };

  return recommendations[type] || recommendations['추천 장소'];
};

const FortunePage = () => {
  const { user, loading } = useAuth();
  const [fortune, setFortune] = useState(null);
  const [error, setError] = useState(null);
  const [loadingFortune, setLoadingFortune] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // 남은 시간 계산
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

  useEffect(() => {
    const loadFortune = async () => {
      if (!user) {
        setLoadingFortune(false);
        return;
      }

      try {
        const todayFortune = await getUserFortune(user.uid);
        setFortune(todayFortune);
      } catch (err) {
        console.error('운세 조회 실패:', err);
        setError(err.message);
      } finally {
        setLoadingFortune(false);
      }
    };

    if (!loading) {
      loadFortune();
    }
  }, [user, loading]);

  if (loading || loadingFortune) {
    return <div>운세를 불러오는 중입니다...</div>;
  }

  if (!user) {
    return <div>로그인이 필요한 서비스입니다.</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  const zodiacSigns = [
    { id: 'rat', name: '쥐', year: 1984, emoji: '🐀', 
      summary: '새로운 시작을 하기 좋은 날입니다.' },
    { id: 'ox', name: '소', year: 1985, emoji: '🐂', 
      summary: '주변 사람들과의 소통이 중요한 날입니다.' },
    { id: 'tiger', name: '호랑이', year: 1986, emoji: '🐅', 
      summary: '창의력이 돋보이는 날입니다.' },
    { id: 'rabbit', name: '토끼', year: 1987, emoji: '🐇', 
      summary: '차분하게 계획을 세워보세요.' },
    { id: 'dragon', name: '용', year: 1988, emoji: '🐉', 
      summary: '행운이 함께하는 날입니다.' },
    { id: 'snake', name: '뱀', year: 1989, emoji: '🐍', 
      summary: '직감을 믿어보세요.' },
    { id: 'horse', name: '말', year: 1990, emoji: '🐎', 
      summary: '활동적인 하루가 될 것입니다.' },
    { id: 'goat', name: '양', year: 1991, emoji: '🐑', 
      summary: '예술적 영감이 넘치는 날입니다.' },
    { id: 'monkey', name: '원숭이', year: 1992, emoji: '🐒', 
      summary: '재치있는 대응이 필요한 날입니다.' },
    { id: 'rooster', name: '닭', year: 1993, emoji: '🐓', 
      summary: '자신감을 가지고 행동하세요.' },
    { id: 'dog', name: '개', year: 1994, emoji: '🐕', 
      summary: '신뢰를 쌓기 좋은 날입니다.' },
    { id: 'pig', name: '돼지', year: 1995, emoji: '🐖', 
      summary: '풍요로운 하루가 될 것입니다.' }
  ];

  // 시간 표시 컴포넌트
  const TimeDisplay = () => (
    <div className="mt-2 inline-flex items-center px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium">
      <IoTime className="w-4 h-4 mr-2" />
      <div className="flex items-center space-x-1">
        <span>다음 운세까지</span>
        <div className="flex items-center space-x-1">
          <span className="bg-primary/10 px-2 py-0.5 rounded">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-primary/10 px-2 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-primary/10 px-2 py-0.5 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );

  const luckyItems = [
    {
      id: 'color',
      emoji: '🎨',
      title: '행운의 색',
      item: '로얄 블루',
      description: '차분하고 신뢰감 있는 인상을 줄 거예요'
    },
    {
      id: 'number',
      emoji: '🎲',
      title: '행운의 숫자',
      item: '7, 14, 28',
      description: '이 숫자들이 행운을 가져다줄 거예요'
    },
    {
      id: 'direction',
      emoji: '🧭',
      title: '행운의 방향',
      item: '동남쪽',
      description: '이 방향으로 가면 좋은 일이 생길 거예요'
    },
    {
      id: 'time',
      emoji: '⌚️',
      title: '행운의 시간',
      item: '오후 2시',
      description: '이 시간에 중요한 일을 하면 좋아요'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-2">
      {/* 오늘의 운세 섹션 */}
      <section className="px-4 mb-6">
        <div className="border border-gray-100 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">오늘의 운세</h1>
            <p className="text-gray-500">
              {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
            </p>
            <TimeDisplay />
          </div>

          {fortune ? (
            <div className="space-y-6">
              {/* 오늘의 총운 */}
              <div>
                <h2 className="text-lg font-bold text-primary mb-2">오늘의 총운</h2>
                <p className="text-gray-700 leading-relaxed">{fortune.overall}</p>
              </div>

              {/* 상세 운세 - 프리미엄 유도 */}
              <div className="relative">
                {/* 블러 처리된 운세 내용 */}
                <div className="grid grid-cols-2 gap-4 blur-sm">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">금전운</h3>
                    <p className="text-sm text-gray-600">{fortune.money}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">애정운</h3>
                    <p className="text-sm text-gray-600">{fortune.love}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">건강운</h3>
                    <p className="text-sm text-gray-600">{fortune.health}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">오늘의 조언</h3>
                    <p className="text-sm text-gray-600">{fortune.advice}</p>
                  </div>
                </div>

                {/* 프리미엄 유도 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                  <div className="text-center p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                      <IoSparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-primary font-bold mb-2">프리미엄 운세</h4>
                    <p className="text-sm text-gray-600 mb-4 max-w-[240px] mx-auto">
                      AI가 분석한 더 자세한 운세와<br />
                      맞춤 길운 정보를 확인해보세요
                    </p>
                    <button
                      onClick={() => navigate('/profile/premium')}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      프리미엄 이용하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 행운 아이템 */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-gray-500">행운의 색상:</span>
                  <span className="ml-2 font-medium">{fortune.color}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">행운의 방향:</span>
                  <span className="ml-2 font-medium">{fortune.direction}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">행운의 시간:</span>
                  <span className="ml-2 font-medium">{fortune.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">아직 오늘의 운세가 준비되지 않았습니다.</p>
              <p className="text-sm text-gray-400 mt-2">매일 오전 8시에 새로운 운세가 제공됩니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 운세 통계 섹션 */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">
          <span className="text-primary">{user?.nickname || user?.name || '방문자'}</span>님의 이번달 운세 통계
        </h2>
        <div className="border border-gray-100 rounded-2xl p-6">
          <div className="space-y-6">
            {/* 운세 그래프 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
                    85
                  </div>
                </div>
                <div className="text-sm font-medium">금전운</div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-primary to-primary-light rounded-full" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
                    92
                  </div>
                </div>
                <div className="text-sm font-medium">애정운</div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-primary to-primary-light rounded-full" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
                    78
                  </div>
                </div>
                <div className="text-sm font-medium">건강운</div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-primary to-primary-light rounded-full" />
                </div>
              </div>
            </div>

            {/* 프리미엄 마케팅 섹션 */}
            <div className="relative mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <IoSparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-primary">프리미엄 기능 추천</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    더 자세한 운세 분석과 주간/월간 통계, 맞춤형 길운 정보를 확인해보세요.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">주간 운세 분석</span>
                    <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">월간 운세 그래프</span>
                    <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">AI 맞춤 조언</span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/profile/premium')}
                      className="flex items-center justify-center w-full gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      <IoSparkles className="w-4 h-4" />
                      프리미엄 시작하기
                    </button>
          
                  </div>
                </div>
              </div>
              
              {/* 할인 배지 */}
              <div className="absolute top-0 right-0 transform -translate-y-1/2">
                <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                  첫 구독 50% 할인
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 행운의 장소 섹션 교체 */}
      <LuckyPlaces />

      {/* 오늘의 행운 아이템 섹션 */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">오늘의 행운 아이템</h2>
        <div className="border border-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {luckyItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="relative group"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-4 flex flex-col items-center justify-center transition-all group-hover:shadow-lg">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-3">{item.emoji}</span>
                  <span className="text-sm font-medium text-gray-900">{item.title}</span>
                  <span className="text-xs text-primary mt-1">{item.item}</span>
                  <div className="absolute inset-0 bg-white/95 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center px-3">
                      <IoSparkles className="w-5 h-5 text-primary mx-auto mb-2" />
                      <span className="text-xs text-gray-600">{item.description}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 프리미엄 배너 */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IoSparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">시간대별 행운 정보</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      프리미엄에서 더 자세한 정보를 확인하세요
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile/premium')}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 오늘의 띠별 운세 섹션 */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">오늘의 띠별 운세</h2>
        <div className="border border-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4">
            {zodiacSigns.map((zodiac) => (
              <button
                key={zodiac.id}
                onClick={() => setSelectedZodiac(zodiac)}
                className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-3xl mb-1">{zodiac.emoji}</div>
                <h3 className="font-medium text-sm mb-1">{zodiac.name}띠</h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {zodiac.summary}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 띠별 운세 상세 모달 */}
      <ZodiacDetailModal
        isOpen={!!selectedZodiac}
        onClose={() => setSelectedZodiac(null)}
        zodiac={selectedZodiac}
      />

      {/* 행운 아이템 모달 */}
      <LuckyItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        navigate={navigate}
      />
    </div>
  );
};

export default FortunePage; 