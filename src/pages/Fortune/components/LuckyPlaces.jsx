import { useState } from 'react';
import { IoLocation, IoSparkles } from 'react-icons/io5';

const LuckyPlaces = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);

  // 장소 검색 함수 개선
  const searchNearbyPlaces = async (latitude, longitude) => {
    try {
      // 카페, 서점, 공원 각각 검색
      const categories = [
        { code: 'CE7', type: '카페' },    // 카페
        { code: 'BD4', type: '서점' },    // 서점
        { code: 'AT4', type: '공원' }     // 공원
      ];

      const allPlaces = await Promise.all(
        categories.map(async (category) => {
          const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category.code}&x=${longitude}&y=${latitude}&radius=1000&sort=distance`,
            {
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`
              }
            }
          );

          if (!response.ok) throw new Error('API 요청 실패');
          
          const data = await response.json();
          // 각 카테고리별로 가장 가까운 장소 1개씩 선택
          return data.documents[0] ? {
            name: data.documents[0].place_name,
            type: category.type,
            distance: `${Math.round(data.documents[0].distance)}m`,
            luckyMessage: getLuckyMessage(category.type),
            recommendation: getPlaceRecommendation(category.type),
            address: data.documents[0].road_address_name || data.documents[0].address_name
          } : null;
        })
      );

      // null 값 제거하고 결과 반환
      return allPlaces.filter(place => place !== null);
    } catch (error) {
      console.error('카카오 API 요청 실패:', error);
      throw error;
    }
  };

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
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        
        try {
          const results = await searchNearbyPlaces(latitude, longitude);
          setPlaces(results);
        } catch (error) {
          console.error('장소 검색 실패:', error);
          setError('주변 장소를 검색하는데 실패했습니다.');
        }
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

  // 장소 유형별 행운 메시지
  const getLuckyMessage = (type) => {
    const messages = {
      카페: [
        '오늘은 이곳에서 좋은 영감을 얻을 수 있어요',
        '특별한 만남이 기다리고 있을지도 몰라요',
        '여유로운 시간이 행운을 가져다줄 거예요'
      ],
      서점: [
        '새로운 지식이 행운을 가져올 거예요',
        '책 속에서 특별한 인연을 만날 수 있어요',
        '지적 호기심이 행운을 부를 거예요'
      ],
      공원: [
        '자연과 함께하는 시간이 행운을 가져올 거예요',
        '산책하며 좋은 생각이 떠오를 거예요',
        '맑은 공기가 긍정적인 기운을 줄 거예요'
      ]
    };

    const typeMessages = messages[type] || messages['카페'];
    return typeMessages[Math.floor(Math.random() * typeMessages.length)];
  };

  // 장소별 추천 이유
  const getPlaceRecommendation = (type) => {
    const recommendations = {
      카페: "조용한 분위기에서 생각을 정리하고 영감을 얻기 좋은 공간입니다.",
      서점: "책 속에서 지혜와 통찰을 발견할 수 있는 특별한 공간입니다.",
      공원: "자연과 함께 마음의 평화를 찾을 수 있는 최적의 장소입니다."
    };

    return recommendations[type] || "오늘 하루 특별한 행운이 기다리고 있는 곳입니다.";
  };

  return (
    <div className="space-y-4">
      {/* 지도 영역 */}
      <div id="map" className="w-full h-[200px] rounded-xl overflow-hidden" />

      {/* 장소 목록 */}
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
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium mb-1">{place.name}</h3>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{place.type}</span>
                        <span>•</span>
                        <span>{place.distance}</span>
                      </div>
                      <div className="text-xs text-gray-400">{place.address}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    추천
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center mt-1">
                      <IoSparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{place.luckyMessage}</p>
                      <p className="text-xs text-gray-500">{place.recommendation}</p>
                    </div>
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
    </div>
  );
};

export default LuckyPlaces; 