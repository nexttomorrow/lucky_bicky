import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IoHomeOutline, IoHome,
  IoSparklesOutline, IoSparkles,
  IoTicketOutline, IoTicket,
  IoTextOutline, IoText,
  IoPersonOutline, IoPerson
} from 'react-icons/io5';

const DockBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { 
      id: 'home', 
      icon: IoHomeOutline,
      activeIcon: IoHome,
      label: '홈', 
      path: '/' 
    },
    { 
      id: 'fortune', 
      icon: IoSparklesOutline,
      activeIcon: IoSparkles,
      label: '운세', 
      path: '/fortune' 
    },
    { 
      id: 'lotto', 
      icon: IoTicketOutline,
      activeIcon: IoTicket,
      label: '로또', 
      path: '/lotto' 
    },
    { 
      id: 'naming', 
      icon: IoTextOutline,
      activeIcon: IoText,
      label: '작명', 
      path: '/naming' 
    },
    { 
      id: 'profile', 
      icon: IoPersonOutline,
      activeIcon: IoPerson,
      label: '프로필', 
      path: '/profile' 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[85px] bg-white border-t border-gray-100 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-full px-2">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          const Icon = isActive ? tab.activeIcon : tab.icon;
          
          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all
                ${isActive ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => navigate(tab.path)}
            >
              <Icon className={`w-6 h-6 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default DockBar; 