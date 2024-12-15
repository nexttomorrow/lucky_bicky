import Header from '../organisms/Header';
import DockBar from '../organisms/DockBar';

const MobileLayout = ({ children }) => {
  return (
    <div className="relative mx-auto">
      <div className="mx-auto max-w-[430px] min-h-screen bg-white relative">
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gray-100 z-[60]" />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gray-100 z-[60]" />
        
        <Header />
        <main className="pb-[100px] pt-[80px]">
          <div className="pt-4">
            {children}
          </div>
        </main>
        <DockBar />
      </div>
    </div>
  );
};

export default MobileLayout; 