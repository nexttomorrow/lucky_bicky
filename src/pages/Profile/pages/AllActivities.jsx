import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const AllActivities = () => {
  const navigate = useNavigate();
  const activities = [
    { type: '운세', date: '2024.02.23', title: '오늘의 운세', detail: '금전운과 사업운이 좋은 날' },
    { type: '로또', date: '2024.02.22', title: 'AI 추천 번호', detail: '1, 7, 12, 23, 36, 45' },
    { type: '작명', date: '2024.02.20', title: '이름 분석', detail: '지혜로운 기운이 담긴 이름' },
    // ... 더 많은 활동 내역
  ];

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center px-4 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold ml-2">활동 내역</h1>
      </div>
      <div className="px-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-primary font-medium">{activity.type}</span>
                  <h3 className="font-medium mt-1">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.detail}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllActivities; 