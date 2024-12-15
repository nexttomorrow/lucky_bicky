const UserProfile = () => {
  return (
    <section className="px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-primary">김</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">김행운</h2>
            <p className="text-sm text-gray-500">lucky@email.com</p>
            <div className="mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block">
              프리미엄 회원
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-gray-500">저장된 운세</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">5</div>
            <div className="text-sm text-gray-500">저장된 번호</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-sm text-gray-500">작명 내역</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile; 