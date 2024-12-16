import { IoTime } from 'react-icons/io5';

const TimeDisplay = ({ timeLeft }) => (
  <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium">
    <IoTime className="w-4 h-4 mr-2" />
    <div className="flex items-center space-x-1">
      <span>다음 운세까지</span>
      <div className="flex items-center space-x-1">
        <span className="bg-primary/10 px-2 py-0.5 rounded">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-primary/10 px-2 py-0.5 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-primary/10 px-2 py-0.5 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  </div>
);

export default TimeDisplay; 