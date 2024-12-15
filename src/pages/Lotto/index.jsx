import NumberGenerator from './components/NumberGenerator';
import WinningHistory from './components/WinningHistory';
import LuckySpots from './components/LuckySpots';
import Statistics from './components/Statistics';
import WinningGuide from './components/WinningGuide';

const LottoPage = () => {
  return (
    <div className="space-y-6 pt-2">
      <h1 className="text-2xl font-bold px-4 mb-4">로또 번호 추천</h1>
      <NumberGenerator />
      <WinningHistory />
      <Statistics />
      <LuckySpots />
      <WinningGuide />
    </div>
  );
};

export default LottoPage; 