const WinningGuide = () => {
  const tips = [
    { title: '구매 요령', content: '한 장당 최대 5게임까지 구매 가능합니다.' },
    { title: '추첨 시간', content: '매주 토요일 오후 8시 45분' },
    { title: '당첨금 수령', content: '1등의 경우 신분증을 지참하여 로또복권 당첨금 지급청구서를 작성해야 합니다.' },
  ];

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">당첨 가이드</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        {tips.map((tip, index) => (
          <div key={tip.title} className={`py-3 ${index !== tips.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <h3 className="font-medium text-primary mb-1">{tip.title}</h3>
            <p className="text-sm text-gray-600">{tip.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WinningGuide; 