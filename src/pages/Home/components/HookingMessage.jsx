const HookingMessage = () => {
  return (
    <section className="px-4">
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 relative">
          오늘의 운세와 함께
          <br />
          <span className="text-primary">행복한 하루</span> 보내세요
        </h1>
        <p className="text-gray-600 relative">
          매일 아침 8시, 당신만을 위한
          <br />
          특별한 메시지를 전달해드립니다
        </p>
      </div>
    </section>
  );
};

export default HookingMessage; 