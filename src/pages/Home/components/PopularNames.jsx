const PopularNames = () => {
  const names = [
    { name: '서준', meaning: '지혜롭고 준수함', trend: 'up' },
    { name: '시우', meaning: '시대의 우수함', trend: 'same' },
    { name: '하윤', meaning: '하늘의 윤택함', trend: 'up' }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">인기 있는 이름</h2>
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="space-y-4">
          {names.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-sm text-gray-500">{item.meaning}</p>
              </div>
              <span className={`text-sm ${
                item.trend === 'up' ? 'text-red-500' : 
                item.trend === 'down' ? 'text-blue-500' : 'text-gray-500'
              }`}>
                {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '−'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNames; 