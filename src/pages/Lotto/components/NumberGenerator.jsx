import { useState } from 'react';
import { IoSparkles } from 'react-icons/io5';

const NumberGenerator = ({ isPremium, onPremiumClick }) => {
  const [numbers, setNumbers] = useState([8, 12, 23, 36, 41, 45]);
  const [loading, setLoading] = useState(false);

  // 일반 번호 생성 함수
  const generateBasicNumbers = () => {
    const newNumbers = [];
    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!newNumbers.includes(num)) {
        newNumbers.push(num);
      }
    }
    return newNumbers.sort((a, b) => a - b);
  };

  // AI 기반 번호 생성 함수 (프리미엄 전용)
  const generatePremiumNumbers = async () => {
    setLoading(true);
    try {
      // 실제로는 AI API 호출 또는 복잡한 알고리즘 적용
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 효과를 위한 지연
      const numbers = generateBasicNumbers(); // 임시로 기본 생성 사용
      setNumbers(numbers);
    } catch (error) {
      console.error('프리미엄 번호 생성 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (isPremium) {
      generatePremiumNumbers();
    } else {
      setNumbers(generateBasicNumbers());
    }
  };

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">
            {isPremium ? 'AI 추천 번호' : '추천 번호'}
          </h2>
          {isPremium && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              프리미엄
            </span>
          )}
        </div>

        {/* 번호 표시 */}
        <div className="flex justify-between mb-6">
          {numbers.map((number, index) => (
            <div 
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg
                ${isPremium 
                  ? 'bg-gradient-to-br from-primary to-primary-dark text-white' 
                  : 'bg-gray-100 text-gray-700'}`}
            >
              {number}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {/* 번호 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium transition-colors relative
              ${isPremium 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {loading ? (
              <>
                <span className="opacity-0">번호 생성하기</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              </>
            ) : (
              <>
                {isPremium && <IoSparkles className="inline-block w-4 h-4 mr-2" />}
                {isPremium ? 'AI 번호 생성하기' : '번호 생성하기'}
              </>
            )}
          </button>

          {/* QR 코드 저장 버튼 (프리미엄 전용) */}
          {isPremium ? (
            <button className="w-full py-3 bg-gray-50 text-primary rounded-xl font-medium hover:bg-gray-100 transition-colors">
              QR 코드로 저장
            </button>
          ) : (
            <button
              onClick={onPremiumClick}
              className="w-full py-3 bg-primary/5 text-primary rounded-xl font-medium hover:bg-primary/10 transition-colors"
            >
              <IoSparkles className="inline-block w-4 h-4 mr-2" />
              프리미엄으로 더 정확한 번호받기
            </button>
          )}
        </div>

        {/* 프리미엄 설명 - 비구독자에게만 표시 */}
        {!isPremium && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <p className="text-sm text-gray-600">
                프리미엄 서비스에서는 AI가 분석한 더 정확한 번호를 추천해드립니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NumberGenerator; 