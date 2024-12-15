import { IoClose, IoSparkles } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';

const ZodiacDetailModal = ({ isOpen, onClose, zodiac }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // ESC 키 누를 때 모달 닫기
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // 모달 외부 클릭 시 닫기
  const handleModalClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  // 닫기 버튼 클릭
  const handleCloseClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onClose();
  };

  // 프리미엄 버튼 클릭
  const handlePremiumClick = (e) => {
    e.stopPropagation();
    onClose();
    navigate('/profile/premium');
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !zodiac) return null;

  const details = {
    overall: '오늘은 전반적으로 긍정적인 기운이 감돌며, 새로운 시도를 하기에 좋은 날입니다.',
    love: '싱글이라면 특별한 만남이 있을 수 있으며, 연인이 있다면 더욱 깊은 이해를 나눌 수 있습니다.',
    money: '재물운이 상승하는 날입니다. 투자나 재테크에 관심을 가져보세요.',
    work: '업무에서 인정받을 일이 있으며, 동료들과의 협력이 좋은 결과를 가져옵니다.',
    health: '적당한 운동과 휴식의 균형을 맞추면 컨디션이 더욱 좋아질 것입니다.',
    color: '파란색',
    number: '3, 8',
    direction: '동쪽'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleModalClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-[360px] overflow-hidden animate-modal-show"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="relative h-36 bg-primary overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
          
          {/* 닫기 버튼 */}
          <button 
            onClick={handleCloseClick}
            className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="닫기"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">{zodiac.emoji}</div>
              <h2 className="text-xl font-bold text-white">{zodiac.name}띠의 운세</h2>
            </div>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 space-y-6">
          {/* 종합운세 */}
          <div>
            <h3 className="font-medium text-primary mb-2">오늘의 운세</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {details.overall}
            </p>
          </div>

          {/* 운세 상세 - 블러 처리 */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 blur-sm">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">애정운</h4>
                <p className="text-xs text-gray-600">{details.love}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">금전운</h4>
                <p className="text-xs text-gray-600">{details.money}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">직장운</h4>
                <p className="text-xs text-gray-600">{details.work}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">건강운</h4>
                <p className="text-xs text-gray-600">{details.health}</p>
              </div>
            </div>

            {/* 프리미엄 유도 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-3">
                  <IoSparkles className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-primary font-bold mb-1">프리미엄 기능</h4>
                <p className="text-sm text-gray-600 mb-3">
                  더 자세한 운세와 분석을 확인해보세요
                </p>
                <button
                  onClick={handlePremiumClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  프리미엄 이용하기
                </button>
              </div>
            </div>
          </div>

          {/* 행운 아이템 */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <div className="text-center">
              <span className="text-xs text-gray-500">행운의 색</span>
              <div className="font-medium text-sm mt-1">{details.color}</div>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500">행운의 숫자</span>
              <div className="font-medium text-sm mt-1">{details.number}</div>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500">행운의 방향</span>
              <div className="font-medium text-sm mt-1">{details.direction}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacDetailModal; 