import React, { Suspense } from 'react';
import ActiveGameSessions from '@/components/game-sessions/active-game-sessions';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

const GamesPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ActiveGameSessions />
    </Suspense>
  );
};

export default GamesPage;
