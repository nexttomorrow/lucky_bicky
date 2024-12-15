const DetailedFortune = () => {
  const categories = [
    { title: '금전운', score: 90, description: '투자나 재테크에 좋은 기회가 올 수 있습니다.' },
    { title: '애정운', score: 85, description: '솔로는 새로운 만남이, 연인은 더 깊은 이해가 있습니다.' },
    { title: '건강운', score: 75, description: '가벼운 운동으로 컨디션 관리가 필요합니다.' },
    { title: '직장운', score: 88, description: '동료와의 협력이 좋은 결과를 가져옵니다.' }
  ];

  return (
    <section className="px-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.title} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-secondary">{category.title}</h3>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <span className="text-sm text-primary font-medium">{category.score}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedFortune; 