const PremiumBanner = () => {
  return (
    <section className="mx-4">
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">프리미엄 운세</h3>
            <p className="text-sm opacity-90 mb-4">
              더 자세한 운세와 개인 맞춤 분석을<br />
              지금 바로 만나보세요
            </p>
            <button className="px-6 py-2 bg-white text-primary rounded-xl font-medium
                             hover:bg-gray-50 transition-colors">
              자세히 보기
            </button>
          </div>
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            {/* 아이콘 또는 이미지 */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumBanner; 