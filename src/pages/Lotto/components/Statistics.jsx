const Statistics = () => {
  const stats = [
    { title: '최다 출현 번호', numbers: [12, 23, 34], percentage: '23%' },
    { title: '최소 출현 번호', numbers: [5, 9, 44], percentage: '5%' },
    { title: '많이 나온 조합', description: '홀수 4개 + 짝수 2개', percentage: '38%' },
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">당첨 통계</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        {stats.map((stat) => (
          <div key={stat.title} className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">{stat.title}</h3>
              {stat.numbers ? (
                <div className="flex space-x-2">
                  {stat.numbers.map((num) => (
                    <span key={num} className="text-primary font-medium">{num}</span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">{stat.description}</p>
              )}
            </div>
            <div className="text-lg font-bold text-primary">{stat.percentage}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics; 