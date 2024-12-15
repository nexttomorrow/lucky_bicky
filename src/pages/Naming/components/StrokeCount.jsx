const StrokeCount = () => {
  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">획수 분석</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">총획</span>
            <div className="text-2xl font-bold">24획</div>
          </div>
          <div className="text-sm text-primary">길운</div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">성씨 획수</span>
              <span className="font-medium">9획</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-gradient-to-r from-primary to-primary-light" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">이름 획수</span>
              <span className="font-medium">15획</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-gradient-to-r from-primary to-primary-light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrokeCount; 