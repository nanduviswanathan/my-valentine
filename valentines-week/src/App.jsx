import React from 'react';
import { useValentineDate } from './hooks/useValentineDate';
import { VALENTINE_WEEK, isBeforeValentineWeek, isAfterValentineWeek } from './dates';
import Layout from './components/Layout';
import Countdown from './components/Countdown';
import MemoryLane from './components/MemoryLane';
import RoseDay from './components/days/RoseDay';
import ProposeDay from './components/days/ProposeDay';
import ChocolateDay from './components/days/ChocolateDay';
import TeddyDay from './components/days/TeddyDay';
import PromiseDay from './components/days/PromiseDay';
import HugDay from './components/days/HugDay';
import KissDay from './components/days/KissDay';
import ValentineDay from './components/days/ValentineDay';

const App = () => {
  const currentDate = useValentineDate();

  // Format current date to YYYY-MM-DD for comparison (LOCAL TIME)
  // Fix: toISOString() shifts to UTC, which might be yesterday. We want local day match.
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // Find active day config
  const activeDay = VALENTINE_WEEK.find(day => day.date === formattedDate);

  let Content;
  let theme = { gradient: 'from-pink-50 to-rose-100' };

  // STICT DATE LOCKING: Ensure we don't show future days
  const realDate = new Date();
  realDate.setHours(0, 0, 0, 0); // Normalize to midnight

  const requestedDate = activeDay ? new Date(activeDay.date) : null;
  if (requestedDate) {
    requestedDate.setHours(0, 0, 0, 0);
  }

  const isFutureDate = requestedDate && requestedDate > realDate;

  if (isBeforeValentineWeek(currentDate)) {
    Content = <Countdown currentDate={currentDate} />;
  } else if (isFutureDate) {
    // LOCK SCREEN for future dates
    Content = (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-3xl font-serif text-gray-800 mb-4">Patience, my love!</h2>
        <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
          This surprise is locked until <strong>{activeDay.date}</strong>.
          <br />No peeking ahead! 😉
        </p>
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg inline-block">
          <p className="text-sm text-rose-800 font-medium">Come back on the right day!</p>
        </div>
      </div>
    );
  } else if (isAfterValentineWeek(currentDate)) {
    Content = <MemoryLane />;
  } else if (activeDay) {
    theme = activeDay.theme;

    switch (activeDay.id) {
      case 'rose-day':
        Content = <RoseDay />;
        break;
      case 'propose-day':
        Content = <ProposeDay />;
        break;
      case 'chocolate-day':
        Content = <ChocolateDay />;
        break;
      case 'teddy-day':
        Content = <TeddyDay />;
        break;
      case 'promise-day':
        Content = <PromiseDay />;
        break;
      case 'hug-day':
        Content = <HugDay />;
        break;
      case 'kiss-day':
        Content = <KissDay />;
        break;
      case 'valentine-day':
        Content = <ValentineDay />;
        break;
      default:
        Content = <div className="text-center"><h1 className="text-3xl">{activeDay.title}</h1><p>{activeDay.description}</p></div>;
    }
  } else {
    // Fallback
    Content = <div className="text-center text-rose-500">Love is in the air...</div>;
  }

  return (
    <Layout theme={theme}>
      {Content}
    </Layout>
  );
};

export default App;
