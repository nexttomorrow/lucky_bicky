import { IoTrendingUp, IoSparkles } from 'react-icons/io5';

const FortuneAnalysis = ({ user }) => {
  return (
    <div className="px-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <IoSparkles className="w-5 h-5 text-primary" />
          회원님의 운세 분석
        </h2>
        <p className="text-sm text-gray-500 mt-1">AI가 분석한 맞춤형 운세 데이터</p>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-100 mb-6">
        <button className="flex-1 pb-3 text-primary font-medium border-b-2 border-primary text-sm">
          AI 분석
        </button>
        <button className="flex-1 pb-3 text-gray-400 font-medium text-sm">
          실시간 데이터
        </button>
      </div>

      {/* 주간 운세 흐름 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
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

        {/* 차트 영역 */}
        <div className="h-[160px] flex items-end justify-between gap-1.5">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
            const values = [65, 75, 85, 90, 80, 70, 85];
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-sm transition-all duration-300"
                  style={{ height: `${values[index]}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 운세 패턴 & 행운 분석 */}
      <div className="grid grid-cols-2 gap-4 mb-5">
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
            <div className="text-2xl font-bold text-primary">85<span className="text-sm text-gray-400">/100</span></div>
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
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
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
            <span className="font-medium">AI 운세 예측</span>
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
  );
};

export default FortuneAnalysis; 