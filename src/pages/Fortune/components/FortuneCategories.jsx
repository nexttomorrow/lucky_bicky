const FortuneCategories = () => {
  const categories = [
    { title: '타로운세', icon: '🎴', color: 'bg-purple-500' },
    { title: '사주운세', icon: '📅', color: 'bg-red-500' },
    { title: '궁합운세', icon: '❤️', color: 'bg-pink-500' },
    { title: '꿈해몽', icon: '💭', color: 'bg-blue-500' },
    { title: '신년운세', icon: '✨', color: 'bg-yellow-500' },
    { title: '월간운세', icon: '📊', color: 'bg-green-500' }
  ];

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">운세 보기</h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category.title}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium">{category.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FortuneCategories; 