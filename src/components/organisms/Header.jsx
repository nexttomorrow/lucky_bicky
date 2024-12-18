import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IoSearchOutline, IoMenuOutline, IoPersonOutline } from 'react-icons/io5';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 max-w-[430px] mx-auto h-[60px] bg-white/80 backdrop-blur-md z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="text-xl font-bold text-primary">
          러키비키
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <IoSearchOutline className="w-6 h-6" />
          </button>
          {user ? (
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoMenuOutline className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoPersonOutline className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200" />
    </header>
  );
};

export default Header; 