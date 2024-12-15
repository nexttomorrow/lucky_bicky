const ActivityHistory = () => {
  const activities = [
    { type: '운세', date: '2024.02.23', title: '오늘의 운세' },
    { type: '로또', date: '2024.02.22', title: 'AI 추천 번호' },
    { type: '작명', date: '2024.02.20', title: '이름 분석' },
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">최근 활동</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between py-3 ${
                index !== activities.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <span className="text-sm text-primary font-medium">{activity.type}</span>
                <h3 className="font-medium mt-1">{activity.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityHistory; 