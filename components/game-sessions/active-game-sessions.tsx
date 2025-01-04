import React from 'react';

import NoGameSessions from '@/components/game-sessions/no-game-sessions';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { createClient } from '@/lib/supabase/server';
import ActiveGameSessionsHeader from '@/components/game-sessions/active-game-sessions-header';
import GameSessionCard from '@/components/game-sessions/game-session-card';

const ActiveGameSessions = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from('game-sessions').select('*');

  return (
    <div className="flex grow flex-col gap-4">
      <ActiveGameSessionsHeader />

      {!data?.length ? (
        <NoGameSessions className="grow" />
      ) : (
        <ScrollArea>
          <div className="grid grow grid-cols-2 gap-4">
            {data?.map((game) => <GameSessionCard key={game.id} item={game} />)}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
    </div>
  );
};

export default ActiveGameSessions;
