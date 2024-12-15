const Settings = () => {
  const settings = [
    { title: '알림 설정', description: '푸시 알림 및 이메일 수신 설정' },
    { title: '계정 관리', description: '비밀번호 변경 및 계정 정보 수정' },
    { title: '프리미엄 구독', description: '구독 상태 및 결제 관리' },
    { title: '개인정보 처리방침', description: '개인정보 보호 및 이용약관' }
  ];

  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-bold mb-3">설정</h2>
      <div className="bg-white rounded-xl shadow-sm">
        {settings.map((setting, index) => (
          <button
            key={setting.title}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
              index !== settings.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="text-left">
              <h3 className="font-medium">{setting.title}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Settings; 