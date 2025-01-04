'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import React from 'react';

type NoGameSessionsProps = {
  className?: ClassValue;
};

const NoGameSessions: React.FC<NoGameSessionsProps> = ({ className }) => {
  const onCreateGame = () => {
    fetch('/api/games', {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      <div className="text-2xl">No active games</div>
      <div className="text-sm text-gray-300">
        Create a new game to get started
      </div>
      <Button onClick={onCreateGame}>Create Game</Button>
    </div>
  );
};

export default NoGameSessions;
