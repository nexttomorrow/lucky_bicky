import React, { useState, useCallback, useRef } from 'react';
import { IoClose, IoSparkles } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';

const ZodiacDetailModal = ({ isOpen, onClose, zodiac }) => {
  const [activeTab, setActiveTab] = useState('today');
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { user } = useAuth();
  const modalRef = useRef(null);

  const handleModalClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen || !zodiac) return null;

  // 비회원일 때 보여줄 간단한 내용
  if (!user) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleModalClick}
      >
        <div 
          ref={modalRef}
          className="bg-white rounded-2xl w-full max-w-[360px] overflow-hidden"
        >
          <div className="relative h-32 bg-gradient-to-br from-primary to-primary-dark p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
            >
              <IoClose className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="text-4xl">{zodiac.emoji}</div>
              <div>
                <h2 className="text-xl font-bold text-white">{zodiac.name}띠</h2>
                <p className="text-sm text-white/80">{zodiac.year}년생</p>
              </div>
            </div>
          </div>

          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">더 자세한 운세 보기</h3>
            <p className="text-sm text-gray-600 mb-4">
              로그인하고 무료로 더 자세한<br />
              운세를 확인해보세요
            </p>
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium"
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'today', label: '오늘의 운세' },
    { id: 'detail', label: '상세 운세', premium: true }
  ];

  const renderContent = () => {
    if (activeTab === 'today') {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl">
            <p className="text-gray-700 leading-relaxed">{zodiac.summary}</p>
          </div>
          
          {zodiac.yearlyFortune && (
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-gray-900">생년별 운세</h3>
              {Object.entries(zodiac.yearlyFortune).map(([year, fortune]) => (
                <div 
                  key={year} 
                  className="bg-gray-50 p-3 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{year}년생</span>
                    <span className="text-xs text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                      {year.slice(-2)}년 운세
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{fortune}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-500 block mb-1">오늘의 운세</span>
              <span className="font-medium">{zodiac.details.luck}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-xs text-gray-500 block mb-1">행운의 방향</span>
              <span className="font-medium">동쪽</span>
            </div>
          </div>
        </div>
      );
    }

    // 프리미엄 컨텐츠
    if (!isPremium) {
      return (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoSparkles className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 운세</h3>
          <p className="text-sm text-gray-600 mb-4">
            더 자세한 운세와 금전운, 애정운<br />
            분석을 확인해보세요
          </p>
          <button
            onClick={() => {
              onClose();
              navigate('/profile/premium');
            }}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium"
          >
            프리미엄 시작하기
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-xs text-gray-500 block mb-1">금전운</span>
            <span className="font-medium">{zodiac.details.money}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-xs text-gray-500 block mb-1">애정운</span>
            <span className="font-medium">{zodiac.details.love}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-xs text-gray-500 block mb-1">건강운</span>
            <span className="font-medium">{zodiac.details.health}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-xs text-gray-500 block mb-1">행운의 시간</span>
            <span className="font-medium">오후 2시</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleModalClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-[360px] overflow-hidden"
      >
        <div className="relative h-32 bg-gradient-to-br from-primary to-primary-dark p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="text-4xl">{zodiac.emoji}</div>
            <div>
              <h2 className="text-xl font-bold text-white">{zodiac.name}띠</h2>
              <p className="text-sm text-white/80">{zodiac.year}년생</p>
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}
                ${tab.premium && !isPremium ? 'opacity-50' : ''}`}
              disabled={tab.premium && !isPremium}
            >
              {tab.label}
              {tab.premium && !isPremium && <IoSparkles className="w-3 h-3 ml-1 inline" />}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ZodiacDetailModal; 