const ElementalBalance = () => {
  const elements = [
    { name: '목(木)', percentage: 40, color: 'bg-green-500' },
    { name: '화(火)', percentage: 20, color: 'bg-red-500' },
    { name: '토(土)', percentage: 15, color: 'bg-yellow-500' },
    { name: '금(金)', percentage: 15, color: 'bg-gray-400' },
    { name: '수(水)', percentage: 10, color: 'bg-blue-500' }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">오행 균형</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="space-y-3">
          {elements.map((element) => (
            <div key={element.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{element.name}</span>
                <span className="text-gray-500">{element.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${element.color}`}
                  style={{ width: `${element.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          목(木)의 기운이 강하여 창의성과 성장의 기운이 뛰어납니다.
        </p>
      </div>
    </section>
  );
};

export default ElementalBalance; 