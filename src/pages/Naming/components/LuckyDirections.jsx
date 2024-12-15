const LuckyDirections = () => {
  const directions = [
    { name: '동쪽', description: '목(木)의 방향', isLucky: true },
    { name: '남쪽', description: '화(火)의 방향', isLucky: false },
    { name: '서쪽', description: '금(金)의 방향', isLucky: true },
    { name: '북쪽', description: '수(水)의 방향', isLucky: false }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">방위 운세</h2>
      <div className="grid grid-cols-2 gap-3">
        {directions.map((direction) => (
          <div 
            key={direction.name}
            className={`bg-white p-4 rounded-xl shadow-sm ${
              direction.isLucky ? 'border-2 border-primary' : ''
            }`}
          >
            <h3 className={`font-bold mb-1 ${direction.isLucky ? 'text-primary' : ''}`}>
              {direction.name}
            </h3>
            <p className="text-sm text-gray-600">{direction.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LuckyDirections; 