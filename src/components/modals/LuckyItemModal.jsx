import { IoClose, IoSparkles } from 'react-icons/io5';

const LuckyItemModal = ({ isOpen, onClose, item, navigate }) => {
  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[320px] overflow-hidden animate-modal-show"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative h-40 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
          
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="닫기"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">{item.emoji}</div>
              <h2 className="text-xl font-bold text-white">{item.title}</h2>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <IoSparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 운세</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              시간대별 행운 아이템과<br />
              더 자세한 길운 정보를 확인해보세요
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/profile/premium');
                }}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                프리미엄 시작하기
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                다음에 할게요
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyItemModal; 