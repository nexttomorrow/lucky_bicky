const LuckyNumberSection = () => {
  return (
    <section className="p-4 bg-white rounded-2xl shadow-sm mb-4 mx-4">
      <h2 className="text-xl font-bold mb-4">오늘의 행운 번호</h2>
      <div className="flex justify-around">
        {[8, 12, 23, 36, 41, 45].map((number) => (
          <div 
            key={number}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold"
          >
            {number}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LuckyNumberSection; 