import { useState, useEffect } from 'react';
import { IoDownload } from 'react-icons/io5';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  // iOS 체크를 먼저 선언
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;
  
  // 앱으로 실행 중인지 확인
  const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                             window.navigator.standalone || 
                             document.referrer.includes('android-app://');

  useEffect(() => {
    const handler = (e) => {
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
    const result = await promptInstall.prompt();
    console.log('Install prompt result:', result);
    setPromptInstall(null);
  };

  // 이미 앱으로 실행 중이면 null 반환
  if (isRunningStandalone || (!supportsPWA && !isIOS)) return null;
  
  // iOS standalone 모드에서 실행 중이면 null 반환
  if (isInStandaloneMode) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      {isIOS && !isInStandaloneMode ? (
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