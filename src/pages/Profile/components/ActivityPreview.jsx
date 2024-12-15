const ActivityPreview = () => {
  const recentActivities = [
    { type: '운세', date: '2024.02.23', title: '오늘의 운세' },
    { type: '로또', date: '2024.02.22', title: 'AI 추천 번호' },
  ];

  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">최근 활동</h2>
          <span className="text-sm text-primary">더보기 ›</span>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between"
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

export default ActivityPreview; 