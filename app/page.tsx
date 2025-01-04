import React from 'react';
import { QuestionsList } from '@/app/questions-list';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { ModeToggle } from '@/components/mode-toggle';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div>
      <ModeToggle />
      <Suspense fallback={<LoadingSpinner />}>
        <QuestionsList />
      </Suspense>
    </div>
  );
}
