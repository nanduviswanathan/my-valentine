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

  // Format current date to YYYY-MM-DD for comparison
  const formattedDate = currentDate.toISOString().split('T')[0];

  // Find active day config
  const activeDay = VALENTINE_WEEK.find(day => day.date === formattedDate);

  let Content;
  let theme = { gradient: 'from-pink-50 to-rose-100' };

  if (isBeforeValentineWeek(currentDate)) {
    Content = <Countdown currentDate={currentDate} />;
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
