const SavedResults = () => {
  const savedItems = [
    {
      type: '운세',
      title: '2월 23일 운세',
      preview: '금전운과 사업운이 좋은 날입니다.',
      date: '2024.02.23'
    },
    {
      type: '로또',
      title: '행운의 번호',
      preview: '1, 7, 12, 23, 36, 45',
      date: '2024.02.22'
    }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">저장된 결과</h2>
      <div className="space-y-3">
        {savedItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-primary font-medium">{item.type}</span>
                <h3 className="font-medium mt-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.preview}</p>
              </div>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedResults; 