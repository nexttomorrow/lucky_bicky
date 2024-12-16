import { useState, useEffect } from 'react';
import { IoDownload } from 'react-icons/io5';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // beforeinstallprompt 이벤트 저장
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }
    // 설치 프롬프트 표시
    const result = await promptInstall.prompt();
    console.log('Install prompt result:', result);
    // 프롬프트 사용 후 초기화
    setPromptInstall(null);
  };

  // iOS Safari에서 설치 가이드 표시
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

  if (!supportsPWA && !isIOS) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      {isIOS && !isInStandaloneMode ? (
        // iOS 설치 가이드
        <div className="bg-white rounded-xl shadow-lg p-4 mx-4 flex items-center space-x-3">
          <IoDownload className="w-6 h-6 text-primary" />
          <div className="text-sm">
            <p className="font-medium">앱 설치하기</p>
            <p className="text-gray-500">
              Safari 메뉴 → "홈 화면에 추가" 선택
            </p>
          </div>
        </div>
      ) : (
        // Android 설치 버튼
        <button
          onClick={handleInstallClick}
          className="bg-primary text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2"
        >
          <IoDownload className="w-5 h-5" />
          <span>앱 설치하기</span>
        </button>
      )}
    </div>
  );
};

export default InstallPWA; 