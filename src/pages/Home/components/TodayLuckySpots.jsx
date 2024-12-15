const TodayLuckySpots = () => {
  const spots = [
    { name: '행운의 복권방', location: '서울 강남구', winCount: 5 },
    { name: '대박 로또', location: '부산 해운대구', winCount: 3 }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">오늘의 명당</h2>
      <div className="space-y-3">
        {spots.map((spot) => (
          <div key={spot.name} className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold mb-1">{spot.name}</h3>
                <p className="text-sm text-gray-500">{spot.location}</p>
                <p className="text-sm text-primary mt-1">
                  1등 당첨 {spot.winCount}회
                </p>
              </div>
              <button className="bg-gray-50 text-primary px-3 py-1 rounded-lg text-sm font-medium">
                길찾기
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayLuckySpots; 