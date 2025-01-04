'use client';

import React, { useCallback } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SessionDTO } from '@/types/session.type';
import { useRouter } from 'next/navigation';

const ActiveGameSessionsHeader = () => {
  const { push } = useRouter();

  const onCreateGame = useCallback(() => {
    fetch('/api/games', {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data: SessionDTO) => {
        push(`/games/${data.id}`);
      });
  }, [push]);

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg">Active Games</h3>
      <Button onClick={onCreateGame}>
        <Plus className="size-4" /> New Game
      </Button>
    </div>
  );
};

export default ActiveGameSessionsHeader;
