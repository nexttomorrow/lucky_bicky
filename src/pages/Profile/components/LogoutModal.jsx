import { IoSparkles, IoClose } from 'react-icons/io5';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // 배경 클릭 시 모달 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[320px] overflow-hidden relative">
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <IoClose className="w-5 h-5 text-white" />
        </button>

        {/* 헤더 */}
        <div className="relative h-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <IoSparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">프리미엄 회원이 되어보세요!</h2>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                매일 더 정확한 운세와 상세한 해설을 받아보세요
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI가 분석한 맞춤형 로또 번호를 추천받으세요
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-primary text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                광고 없이 쾌적하게 서비스를 이용하세요
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              프리미엄 가입하기
            </button>
            <button
              onClick={onConfirm}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-3"
            >
              다음에 할게요, 로그아웃 할게요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 