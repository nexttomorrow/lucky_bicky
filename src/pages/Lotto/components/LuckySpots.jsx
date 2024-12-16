import { useState, useEffect } from 'react';
import { 
  IoLocation, 
  IoSparkles, 
  IoStar, 
  IoNavigate, 
  IoTrendingUp,
  IoFilter,
  IoTime,
  IoStatsChart,
  IoClose
} from 'react-icons/io5';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const LuckySpots = ({ isPremium, onPremiumClick }) => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'winCount' | 'rating'
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minWinCount: 0,
    maxDistance: 5,
    openNow: false
  });
  const [mapVisible, setMapVisible] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 필터링된 장소 목록
  const filteredSpots = spots.filter(spot => {
    if (filters.minWinCount > 0 && spot.winCount < filters.minWinCount) return false;
    if (filters.maxDistance > 0 && parseFloat(spot.distance) > filters.maxDistance) return false;
    if (filters.openNow) {
      // 영업시간 체크 로직 추가
      const [open, close] = spot.openHours.split(' - ').map(time => {
        const [hours] = time.split(':').map(Number);
        return hours;
      });
      const currentHour = new Date().getHours();
      if (currentHour < open || currentHour >= close) return false;
    }
    return true;
  });

  // 정렬된 장소 목록
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'winCount':
        return b.winCount - a.winCount;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // 상세 정보 모달
  const SpotDetailModal = ({ spot, onClose }) => {
    if (!spot) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden">
          <div className="relative h-40 bg-gradient-to-br from-primary to-primary-dark p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <IoClose className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-xl font-bold text-white mb-1">{spot.name}</h2>
              <p className="text-white/80 text-sm">{spot.location}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 당첨 통계 */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <IoStatsChart className="w-4 h-4 text-primary mr-2" />
                당첨 통계
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {Object.entries(spot.winningStats).map(([rank, count]) => (
                  <div key={rank} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">{rank}</div>
                    <div className="text-lg font-bold text-primary">{count}회</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 기타 정보 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">영업시간</span>
                <span className="font-medium">{spot.openHours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">최근 당첨</span>
                <span className="font-medium">{spot.lastWinDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">평점</span>
                <div className="flex items-center">
                  <IoStar className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{spot.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({spot.reviews})</span>
                </div>
              </div>
            </div>

            {/* 행운 지수 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">오늘의 행운 지수</h3>
                <div className="text-xl font-bold text-primary">85%</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                오늘은 이 매장에서 로또를 구매하면 좋은 결과가 있을 것 같아요!
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-3">
              <button
                onClick={() => window.open(`https://map.kakao.com/link/search/${spot.location}`)}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90"
              >
                길찾기
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchLuckySpots = async () => {
      setLoading(true);
      try {
        // 실제로는 API에서 데이터를 가져옴
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSpots([
          {
            id: 1,
            name: '행운의 복권방',
            location: '서울 강남구 테헤란로 123',
            distance: '1.2km',
            winCount: 5,
            totalPrize: '123억',
            lastWinDate: '2024-02-15',
            winningStats: {
              '1등': 3,
              '2등': 8,
              '3등': 15
            },
            rating: 4.8,
            reviews: 128,
            openHours: '09:00 - 22:00',
            todayLuck: '행운지수 85%'
          },
          {
            id: 2,
            name: '대박 로또',
            location: '서울 서초구 서초대로 456',
            distance: '2.5km',
            winCount: 3,
            totalPrize: '89억',
            lastWinDate: '2024-01-20',
            winningStats: {
              '1등': 2,
              '2등': 5,
              '3등': 12
            },
            rating: 4.5,
            reviews: 95,
            openHours: '08:00 - 23:00',
            todayLuck: '행운지수 78%'
          }
        ]);
      } catch (error) {
        console.error('행운의 장소 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLuckySpots();
  }, []);

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('위치 정보 가져오기 실패:', error);
        }
      );
    }
  };

  // 실시간 정보 업데이트
  useEffect(() => {
    if (isPremium) {
      const interval = setInterval(() => {
        fetchLuckySpots();
        setLastUpdate(new Date());
      }, 300000); // 5분마다 업데이트
      setRefreshInterval(interval);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isPremium]);

  // 카카오맵 초기화
  useEffect(() => {
    if (mapVisible && window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 5
      };
      const map = new window.kakao.maps.Map(container, options);

      // 매장 마커 표시
      spots.forEach(spot => {
        const markerPosition = new window.kakao.maps.LatLng(spot.lat, spot.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          clickable: true
        });

        marker.setMap(map);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedSpot(spot);
        });
      });
    }
  }, [mapVisible, spots]);

  // 매장 운영 상태 확인
  const getOperationStatus = (openHours) => {
    const [open, close] = openHours.split(' - ').map(time => {
      const [hours] = time.split(':').map(Number);
      return hours;
    });
    const currentHour = new Date().getHours();
    
    if (currentHour >= open && currentHour < close) {
      return { status: 'open', text: '영업중' };
    } else if (currentHour + 1 === open) {
      return { status: 'soon', text: '곧 영업 시작' };
    } else {
      return { status: 'closed', text: '영업 종료' };
    }
  };

  // 거리 표시 포맷
  const formatDistance = (distance) => {
    const dist = parseFloat(distance);
    return dist < 1 ? `${(dist * 1000).toFixed(0)}m` : `${dist.toFixed(1)}km`;
  };

  // 매장 카드 렌더링
  const renderSpotCard = (spot) => (
    <div 
      key={spot.id}
      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={() => isPremium && setSelectedSpot(spot)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold">{spot.name} </h3>
            {isPremium && (
              <>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  getOperationStatus(spot.openHours).status === 'open'
                    ? 'bg-green-100 text-green-600'
                    : getOperationStatus(spot.openHours).status === 'soon'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getOperationStatus(spot.openHours).text}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center justify-center whitespace-nowrap">
                  {spot.todayLuck}
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {spot.location} • {formatDistance(spot.distance)}
          </p>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-primary font-medium">
              1등 당첨 {spot.winCount}회
            </span>
            {isPremium && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center">
                  <IoStar className="w-4 h-4 text-yellow-400 mr-1" />
                  {spot.rating} ({spot.reviews})
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://map.kakao.com/link/search/${spot.location}`);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <IoNavigate className="w-4 h-4" />
            <span>길찾기</span>
          </button>
          {isPremium && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMapVisible(true);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <IoLocation className="w-4 h-4" />
              <span>지도보기</span>
            </button>
          )}
        </div>
      </div>

      {isPremium && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">영업시간</div>
              <div className="text-sm font-medium">{spot.openHours}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">총 당첨금</div>
              <div className="text-sm font-medium text-primary">{spot.totalPrize}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">최근 당첨</div>
              <div className="text-sm font-medium">{spot.lastWinDate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <section className="px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl shadow-sm">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IoLocation className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">당첨 명당</h2>
          </div>
          {isPremium && (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <IoFilter className="w-5 h-5" />
              </button>
              <button
                onClick={getCurrentLocation}
                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-lg"
              >
                현재 위치에서 찾기
              </button>
            </div>
          )}
        </div>

        {/* 마지막 업데이트 시간 */}
        {isPremium && (
          <div className="text-xs text-gray-500 mb-4">
            마지막 업데이트: {format(lastUpdate, 'a h:mm', { locale: ko })}
          </div>
        )}

        {/* 지도 뷰 */}
        {mapVisible && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <div id="map" className="w-full h-[300px]" />
          </div>
        )}

        {/* 필터 패널 */}
        {showFilters && isPremium && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">최소 당첨 횟수</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={filters.minWinCount}
                  onChange={(e) => setFilters({ ...filters, minWinCount: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">{filters.minWinCount}회 이상</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">최대 거리</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.maxDistance}
                  onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">{filters.maxDistance}km 이내</div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={(e) => setFilters({ ...filters, openNow: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">현재 영업중</label>
              </div>
            </div>
          </div>
        )}

        {/* 정렬 옵션 */}
        {isPremium && (
          <div className="flex space-x-2 mb-4">
            {[
              { id: 'distance', label: '거리순' },
              { id: 'winCount', label: '당첨순' },
              { id: 'rating', label: '평점순' }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${sortBy === option.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* 매장 목록 */}
        <div className="space-y-4">
          {sortedSpots.map(renderSpotCard)}
        </div>

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
                  실시간 당첨 확률과 상세한 매장 정보를<br />
                  확인해보세요
                </p>
                <button
                  onClick={onPremiumClick}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  프리미엄 시작하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 상세 정보 모달 */}
        <SpotDetailModal 
          spot={selectedSpot} 
          onClose={() => setSelectedSpot(null)} 
        />
      </div>
    </section>
  );
};

export default LuckySpots; 