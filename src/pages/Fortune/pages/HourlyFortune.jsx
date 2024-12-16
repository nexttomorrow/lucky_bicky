import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoSparkles, IoTime, IoCalendarOutline } from 'react-icons/io5';
import { useUserRole } from '../../../hooks/useUserRole';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

const HourlyFortune = () => {
  const navigate = useNavigate();
  const { isPremium, loading } = useUserRole();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜 선택 옵션 (오늘부터 7일)
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: date,
      label: i === 0 ? '오늘' : i === 1 ? '내일' : format(date, 'M월 d일 (EE)', { locale: ko })
    };
  });

  // 24시간 단위의 행운 정보
  const hourlyItems = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const ampm = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    
    return {
      time: `${ampm} ${displayHour}시`,
      items: {
        color: ['빨강', '파랑', '노랑', '보라', '초록'][Math.floor(Math.random() * 5)],
        direction: ['동', '서', '남', '북', '북동', '남동', '북서', '남서'][Math.floor(Math.random() * 8)],
        number: Math.floor(Math.random() * 45) + 1,
        activity: [
          '중요한 결정하기',
          '운동하기',
          '독서하기',
          '명상하기',
          '산책하기',
          '친구 만나기',
          '쇼핑하기',
          '공부하기'
        ][Math.floor(Math.random() * 8)]
      }
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-2 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-2">
      {/* 헤더 */}
      <div className="border-b border-gray-100">
        <div className="flex items-center px-4 h-14">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">시간대별 행운 정보</h1>
        </div>

        {/* 날짜 선택 */}
        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {dateOptions.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedDate.getDate() === date.value.getDate()
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 선택된 날짜 표시 */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IoCalendarOutline className="w-5 h-5 text-primary" />
          <span className="font-medium">
            {format(selectedDate, 'yyyy년 M월 d일 EEEE', { locale: ko })}
          </span>
        </div>
        {isPremium && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            프리미엄
          </span>
        )}
      </div>

      {/* 시간대별 정보 목록 */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 gap-3">
          {hourlyItems.map((hourly, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IoTime className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{hourly.time}</h3>
                    <p className="text-xs text-gray-500">
                      행운의 시간대
                    </p>
                  </div>
                </div>
                {isPremium && (
                  <div className="text-right">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      AI 분석
                    </span>
                  </div>
                )}
              </div>

              {isPremium ? (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">행운의 색상</span>
                      <span className="font-medium">{hourly.items.color}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">행운의 방향</span>
                      <span className="font-medium">{hourly.items.direction}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">행운의 숫자</span>
                      <span className="font-medium">{hourly.items.number}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">추천 활동</span>
                      <span className="font-medium">{hourly.items.activity}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center py-4">
                  <p className="text-sm text-gray-500 mb-3">
                    프리미엄 서비스에서<br />
                    시간대별 상세 정보를 확인하세요
                  </p>
                  <button
                    onClick={() => navigate('/profile/premium')}
                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg"
                  >
                    프리미엄 시작하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyFortune; 