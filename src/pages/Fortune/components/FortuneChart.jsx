import { useState, useEffect } from 'react';
import { IoTrendingUp } from 'react-icons/io5';
import { format, startOfWeek, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const FortuneChart = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyFortune = async () => {
      if (!user) return;

      try {
        const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // 월요일부터 시작
        const docRef = doc(db, 'weeklyFortunes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 기존 데이터가 있는 경우
          const data = docSnap.data();
          const weekStartFromData = new Date(data.weekStart.seconds * 1000);

          // 새로운 주가 시작되었는지 확인
          if (weekStart > weekStartFromData) {
            // 새로운 주의 데이터 생성
            const newData = generateWeeklyData();
            await setDoc(docRef, newData);
            setChartData(newData);
          } else {
            setChartData(data);
          }
        } else {
          // 새 사용자의 경우 첫 데이터 생성
          const newData = generateWeeklyData();
          await setDoc(docRef, newData);
          setChartData(newData);
        }
      } catch (error) {
        console.error('주간 운세 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyFortune();
  }, [user]);

  // 주간 운세 데이터 생성 함수
  const generateWeeklyData = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = [];
    const values = [];
    let total = 0;

    // 7일치 데이터 생성
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      days.push(format(date, 'E', { locale: ko }));
      // 65-95 사이의 랜덤 값 생성
      const value = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
      values.push(value);
      total += value;
    }

    const avgValue = Math.round(total / 7);
    // 이전 주 대비 변화율 (-10% ~ +10%)
    const changeRate = (Math.random() * 20 - 10).toFixed(1);

    return {
      weekStart,
      days,
      values,
      trends: {
        total: avgValue,
        change: `${changeRate > 0 ? '+' : ''}${changeRate}%`,
        isUp: changeRate > 0
      }
    };
  };

  if (loading || !chartData) {
    return <div className="p-6 text-center text-gray-500">데이터를 불러오는 중...</div>;
  }

  const maxValue = Math.max(...chartData.values);
  const maxDay = chartData.days[chartData.values.indexOf(maxValue)];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg">주간 운세 흐름</h3>
          <p className="text-sm text-gray-500 mt-1">이번 주 운세 지수 {chartData.trends.total}점</p>
        </div>
        <div className="flex items-center text-emerald-500 text-sm font-medium">
          <IoTrendingUp className="w-4 h-4 mr-1" />
          <span>{chartData.trends.change}</span>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="relative">
        <div className="h-[180px] flex items-end justify-between gap-2">
          {chartData.values.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full">
                <div 
                  className={`w-full bg-gradient-to-t from-primary/80 to-primary rounded-t-lg transition-all duration-500
                    ${chartData.days[index] === maxDay ? 'bg-primary' : 'bg-primary/60'}`}
                  style={{ height: `${value}%` }}
                />
                {chartData.days[index] === maxDay && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      최고 {value}점
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className={`text-xs font-medium ${chartData.days[index] === maxDay ? 'text-primary' : 'text-gray-500'}`}>
                  {chartData.days[index]}
                </span>
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  {value}점
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 배경 그리드 라인 */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-full border-t border-gray-100 flex items-center"
            >
              <span className="text-[10px] text-gray-400 mr-2">
                {100 - i * 20}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 차트 하단 설명 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-4">
          <div>
            <div className="text-sm text-gray-500">최고 운세일</div>
            <div className="font-bold text-lg text-primary">{maxDay}요일</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">평균 운세</div>
            <div className="font-bold text-lg">{chartData.trends.total}점</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">전주 대비</div>
            <div className="font-bold text-lg text-emerald-500">{chartData.trends.change}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneChart; 