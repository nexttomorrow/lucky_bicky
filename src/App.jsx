import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/organisms/Header';
import DockBar from './components/organisms/DockBar';
import AuthProvider from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="relative mx-auto">
          <div className="mx-auto max-w-[430px] min-h-screen bg-white relative">
            {/* 좌우 테두리 */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gray-100 z-[60]" />
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gray-100 z-[60]" />
            
            {/* 헤더 */}
            <Header />

            {/* 메인 컨텐츠 */}
            <main className="pb-[100px] pt-[80px]">
              <div className="pt-4">
                <AppRoutes />
              </div>
            </main>

            {/* 하단 네비게이션 */}
            <DockBar />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;