const PopularNames = () => {
  const names = [
    { name: '서준', count: 5324, trend: 'up' },
    { name: '도윤', count: 4982, trend: 'up' },
    { name: '시우', count: 4521, trend: 'down' },
    { name: '지호', count: 4123, trend: 'same' }
  ];

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">인기 이름</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="space-y-4">
          {names.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500 ml-2">{item.count}명</span>
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