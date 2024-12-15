import NameInput from './components/NameInput';
import NameAnalysis from './components/NameAnalysis';
import StrokeCount from './components/StrokeCount';
import ElementalBalance from './components/ElementalBalance';
import LuckyDirections from './components/LuckyDirections';
import PopularNames from './components/PopularNames';

const NamingPage = () => {
  return (
    <div className="space-y-6 pt-2">
      <h1 className="text-2xl font-bold px-4 mb-4">전문가 작명</h1>
      <NameInput />
      <NameAnalysis />
      <StrokeCount />
      <ElementalBalance />
      <LuckyDirections />
      <PopularNames />
    </div>
  );
};

export default NamingPage; 