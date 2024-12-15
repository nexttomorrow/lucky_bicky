import FortuneOverview from './components/FortuneOverview';
import DetailedFortune from './components/DetailedFortune';
import LuckyItems from './components/LuckyItems';
import FortuneCategories from './components/FortuneCategories';

const FortunePage = () => {
  return (
    <div className="space-y-6 pt-2">
      <h1 className="text-2xl font-bold px-4 mb-4">오늘의 운세</h1>
      <FortuneOverview />
      <DetailedFortune />
      <LuckyItems />
      <FortuneCategories />
    </div>
  );
};

export default FortunePage; 