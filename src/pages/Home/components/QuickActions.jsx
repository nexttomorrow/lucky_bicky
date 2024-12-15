import { IoSparklesOutline, IoTicketOutline, IoTextOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: IoSparklesOutline,
      label: '운세보기',
      path: '/fortune',
      gradient: 'from-yellow-400 to-orange-400'
    },
    {
      icon: IoTicketOutline,
      label: '로또번호',
      path: '/lotto',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: IoTextOutline,
      label: '이름풀이',
      path: '/naming',
      gradient: 'from-blue-400 to-indigo-500'
    }
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold mb-3">바로가기</h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all"
          >
            <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium mt-3 block text-gray-700 group-hover:text-gray-900">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions; 