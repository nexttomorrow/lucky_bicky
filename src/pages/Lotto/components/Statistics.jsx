import { useState, useEffect } from 'react';
import { 
  IoSparkles, 
  IoTrendingUp, 
  IoBarChart, 
  IoStatsChart, 
  IoAnalytics,
  IoCalendar,
  IoCheckmarkCircle
} from 'react-icons/io5';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('frequency');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('1month');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          frequency: {
            mostFrequent: [12, 23, 34, 45],
            leastFrequent: [5, 9, 44, 2],
            combinations: {
              odd: '홀수 4개 + 짝수 2개',
              percentage: '38%'
            },
            sections: {
              '1-10': '15%',
              '11-20': '25%',
              '21-30': '30%',
              '31-40': '20%',
              '41-45': '10%'
            }
          },
          patterns: {
            consecutive: '연속된 숫자 2개 포함',
            sum: '평균 합계: 132.5',
            distribution: '고른 분포',
            hotNumbers: [7, 12, 25, 33],
            coldNumbers: [1, 4, 39, 43],
            bestPairs: ['12-25', '7-33', '15-45']
          },
          analysis: {
            trend: '상승세',
            prediction: '높은 당첨 가능성',
            confidence: '85%',
            winningProbability: '상위 15%',
            recommendations: [
              '1-10 구간에서 1개 선택',
              '20-30 구간에서 2개 선택',
              '31-45 구간에서 3개 선택'
            ],
            aiConfidence: 92
          }
        });
      } catch (error) {
        console.error('통계 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  const timeRanges = [
    { id: '1month', label: '1개월' },
    { id: '3months', label: '3개월' },
    { id: '6months', label: '6개월' },
    { id: '1year', label: '1년' }
  ];

  if (loading) {
    return (
      <div className="px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderFrequencyContent = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-medium text-primary mb-3 flex items-center">
          <IoStatsChart className="w-4 h-4 mr-2" />
          구간별 출현 빈도
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(stats.frequency.sections).map(([range, percent]) => (
            <div key={range} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{range}</div>
              <div className="h-20 bg-gray-100 rounded-lg relative">
                <div 
                  className="absolute bottom-0 w-full bg-primary rounded-lg transition-all"
                  style={{ height: percent }}
                />
              </div>
              <div className="text-xs font-medium mt-1">{percent}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm text-gray-500 mb-2">최다 출현 번호</h3>
          <div className="flex flex-wrap gap-2">
            {stats.frequency.mostFrequent.map(num => (
              <span key={num} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {num}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm text-gray-500 mb-2">최소 출현 번호</h3>
          <div className="flex flex-wrap gap-2">
            {stats.frequency.leastFrequent.map(num => (
              <span key={num} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatternsContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-medium mb-2">Hot Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {stats.patterns.hotNumbers.map(num => (
              <span key={num} className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                {num}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-medium mb-2">Cold Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {stats.patterns.coldNumbers.map(num => (
              <span key={num} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-medium mb-3">Best Combinations</h3>
        <div className="space-y-2">
          {stats.patterns.bestPairs.map(pair => (
            <div key={pair} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{pair}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                추천
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalysisContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">AI 분석 신뢰도</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">{stats.analysis.aiConfidence}</span>
            <span className="text-sm text-primary ml-1">%</span>
          </div>
        </div>
        <div className="space-y-2">
          {stats.analysis.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2">
              <IoCheckmarkCircle className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-sm text-gray-600">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-medium mb-3">당첨 확률 분석</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">현재 추세: {stats.analysis.trend}</span>
          <span className="text-sm font-medium text-primary">
            상위 {stats.analysis.winningProbability}
          </span>
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
            <IoSparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">당첨 분석</h2>
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            프리미엄 전용
          </span>
        </div>

        {/* 기간 선택 */}
        <div className="flex space-x-2 mb-6 bg-gray-50 p-1 rounded-lg">
          {timeRanges.map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors
                ${timeRange === range.id 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* 탭 메뉴 */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'frequency', label: '출현 빈도', icon: IoBarChart },
            { id: 'patterns', label: '패턴 분석', icon: IoTrendingUp },
            { id: 'analysis', label: 'AI 분석', icon: IoAnalytics }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              <tab.icon className="w-4 h-4 mx-auto mb-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 컨텐츠 */}
        {activeTab === 'frequency' && renderFrequencyContent()}
        {activeTab === 'patterns' && renderPatternsContent()}
        {activeTab === 'analysis' && renderAnalysisContent()}
      </div>
    </section>
  );
};

export default Statistics; 