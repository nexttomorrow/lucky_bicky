const BannerSection = () => {
  return (
    <section className="px-4 mb-4">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-2">프리미엄 운세 서비스</h3>
        <p className="text-sm opacity-90">
          더 자세한 운세와 개인 맞춤 분석을 만나보세요
        </p>
        <button className="mt-4 bg-white text-primary px-4 py-2 rounded-lg font-medium">
          자세히 보기
        </button>
      </div>
    </section>
  );
};

export default BannerSection; 