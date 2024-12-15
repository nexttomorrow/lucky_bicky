const NameInput = () => {
  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-4">이름 입력</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">성씨</label>
            <input 
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="김"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
            <input 
              type="date"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
            <div className="flex space-x-3">
              <button className="flex-1 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5">
                남자
              </button>
              <button className="flex-1 py-2 border border-gray-200 text-gray-500 rounded-lg font-medium hover:bg-gray-50">
                여자
              </button>
            </div>
          </div>
          <button className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            이름 분석하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default NameInput; 