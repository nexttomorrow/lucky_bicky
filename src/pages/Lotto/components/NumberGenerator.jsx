const NumberGenerator = () => {
  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-4">AI 추천 번호</h2>
        <div className="flex justify-between mb-6">
          {[8, 12, 23, 36, 41, 45].map((number) => (
            <div 
              key={number}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark 
                        text-white flex items-center justify-center font-bold text-lg shadow-lg"
            >
              {number}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <button className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            번호 생성하기
          </button>
          <button className="w-full py-3 bg-gray-50 text-primary rounded-xl font-medium hover:bg-gray-100 transition-colors">
            QR 코드로 저장
          </button>
        </div>
      </div>
    </section>
  );
};

export default NumberGenerator; 