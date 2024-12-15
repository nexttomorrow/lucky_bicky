const LuckyNumbers = () => {
  return (
    <section className="mx-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="bg-secondary/5 p-4 rounded-xl">
          <h2 className="text-lg font-bold text-secondary mb-1">행운의 번호</h2>
          <p className="text-sm text-gray-500">이번 주 추천 번호</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between">
            {[8, 12, 23, 36, 41, 45].map((number) => (
              <div 
                key={number}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark 
                          text-white flex items-center justify-center font-bold shadow-lg"
              >
                {number}
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-gray-50 text-primary font-medium rounded-xl
                           hover:bg-gray-100 transition-colors">
            번호 다시 생성하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuckyNumbers; 