const WinningHistory = () => {
  const recentWinnings = [
    { round: 1234, numbers: [1, 15, 23, 29, 37, 42], bonus: 45, prize: '23억' },
    { round: 1233, numbers: [5, 12, 25, 32, 40, 43], bonus: 30, prize: '19억' },
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">당첨 번호 확인</h2>
      <div className="space-y-3">
        {recentWinnings.map((winning) => (
          <div key={winning.round} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold">{winning.round}회</span>
              <span className="text-primary font-medium">{winning.prize}</span>
            </div>
            <div className="flex items-center space-x-2">
              {winning.numbers.map((num) => (
                <div key={num} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                  {num}
                </div>
              ))}
              <span className="text-gray-400 mx-1">+</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                {winning.bonus}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WinningHistory; 