import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const SavedResultsPage = () => {
  const navigate = useNavigate();
  const savedItems = [
    {
      type: '운세',
      title: '2월 23일 운세',
      preview: '금전운과 사업운이 좋은 날입니다.',
      date: '2024.02.23',
      category: '오늘의 운세'
    },
    {
      type: '로또',
      title: '행운의 번호',
      preview: '1, 7, 12, 23, 36, 45',
      date: '2024.02.22',
      category: 'AI 추천'
    },
    // ... 더 많은 저장된 결과
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
        <h1 className="text-2xl font-bold ml-2">저장된 결과</h1>
      </div>
      <div className="px-4">
        <div className="space-y-4">
          {savedItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-primary font-medium">{item.type}</span>
                    <span className="text-xs text-gray-500">| {item.category}</span>
                  </div>
                  <h3 className="font-medium mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.preview}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">{item.date}</span>
                  <button className="mt-2 text-xs text-primary">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedResultsPage; 