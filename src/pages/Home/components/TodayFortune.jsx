import { IoSparkles, IoCalendarOutline } from 'react-icons/io5';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const TodayFortune = () => {
  const today = new Date();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IoSparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold">오늘의 운세</h2>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <IoCalendarOutline className="w-4 h-4 mr-1" />
          {format(today, 'M월 d일 EEEE', { locale: ko })}
        </div>
      </div>

      {/* 운세 내용 */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl mb-4">
        <p className="text-gray-700 leading-relaxed">
          오늘은 새로운 시도나 도전에 좋은 날입니다. 
          긍정적인 마인드로 임하면 좋은 결과가 있을 것입니다. 
          주변 사람들과의 소통에서도 좋은 기운이 감지됩니다.
        </p>
      </div>

      {/* 행운 아이템 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '행운의 색', value: '블루' },
          { label: '행운의 숫자', value: '7' },
          { label: '행운의 방향', value: '동쪽' }
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-xl text-center">
            <div className="text-xs text-gray-500 mb-1">{item.label}</div>
            <div className="font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayFortune; 