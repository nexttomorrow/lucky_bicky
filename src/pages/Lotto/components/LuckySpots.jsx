const LuckySpots = () => {
  const spots = [
    { name: '행운의 복권방', location: '서울 강남구', winCount: 5, prize: '123억' },
    { name: '대박 로또', location: '부산 해운대구', winCount: 3, prize: '89억' },
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">당첨 명당</h2>
      <div className="space-y-3">
        {spots.map((spot) => (
          <div key={spot.name} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold mb-1">{spot.name}</h3>
                <p className="text-sm text-gray-500">{spot.location}</p>
                <p className="text-sm text-primary mt-2">
                  1등 당첨 {spot.winCount}회 / 총 {spot.prize}
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

export default LuckySpots; 