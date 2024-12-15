const NameAnalysis = () => {
  const meanings = [
    { hanja: '智', hangul: '지', meaning: '지혜롭다', energy: '양(陽)' },
    { hanja: '勇', hangul: '용', meaning: '용감하다', energy: '양(陽)' }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">이름 분석</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">지용</div>
          <div className="text-sm text-primary font-medium">길운지수 85%</div>
        </div>
        <div className="space-y-4">
          {meanings.map((char) => (
            <div key={char.hanja} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl font-bold text-primary">
                {char.hanja}
              </div>
              <div>
                <div className="font-medium mb-1">{char.hangul} ({char.hanja})</div>
                <p className="text-sm text-gray-600">{char.meaning}</p>
                <div className="text-xs text-primary mt-1">에너지: {char.energy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NameAnalysis; 