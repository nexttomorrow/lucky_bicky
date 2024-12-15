const FortuneOverview = () => {
  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-primary">종합운세</h2>
            <p className="text-sm text-gray-500">2024년 2월 23일</p>
          </div>
          <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
            85점
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          오늘은 전반적으로 긍정적인 기운이 감도는 날입니다. 
          특히 오후에 좋은 소식이 기다리고 있으며, 
          대인관계에서 특별한 인연을 만날 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default FortuneOverview; 