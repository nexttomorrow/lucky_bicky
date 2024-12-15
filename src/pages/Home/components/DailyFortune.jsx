const DailyFortune = () => {
  return (
    <section className="mx-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-4">
          <h2 className="text-lg font-bold text-primary mb-1">오늘의 운세</h2>
          <p className="text-sm text-gray-500">2024년 2월 23일</p>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">
            오늘은 특별한 행운이 당신을 기다리고 있습니다. 
            새로운 시작을 위한 좋은 기회가 찾아올 것이며, 
            긍정적인 마음가짐이 행복을 불러올 것입니다.
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-primary font-medium">행운의 색: 블루</span>
            <span className="text-primary font-medium">행운의 방향: 동쪽</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyFortune; 