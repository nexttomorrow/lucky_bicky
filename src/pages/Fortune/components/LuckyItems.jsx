const LuckyItems = () => {
  const items = [
    { title: '행운의 색', value: '블루', bgColor: 'bg-blue-500' },
    { title: '행운의 방향', value: '동쪽', icon: '🧭' },
    { title: '행운의 시간', value: '오후 2시', icon: '🕑' },
    { title: '행운의 숫자', value: '7, 14', icon: '🔢' }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">오늘의 행운</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-2">{item.title}</h3>
            <div className="flex items-center space-x-2">
              {item.bgColor ? (
                <div className={`w-4 h-4 rounded-full ${item.bgColor}`} />
              ) : (
                <span className="text-xl">{item.icon}</span>
              )}
              <span className="font-medium">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LuckyItems; 