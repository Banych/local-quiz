import React from 'react';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { Suspense } from 'react';
import ActiveGameSessions from '@/components/game-sessions/active-game-sessions';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ActiveGameSessions />
      </Suspense>
    </>
  );
}
