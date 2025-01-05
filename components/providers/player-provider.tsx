'use client';

import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { PlayerProviderContextType } from '@/types/player-provider.context.type';
import { PlayerDTO } from '@/types/player.type';
import React, {
  PropsWithChildren,
  Suspense,
  useCallback,
  useEffect,
} from 'react';

export const PlayerContext = React.createContext<PlayerProviderContextType>({
  player: null,
});

const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [player, setPlayerState] =
    React.useState<PlayerProviderContextType['player']>(null);
  const [isPlayerLoading, setIsPlayerLoading] = React.useState(true);

  useEffect(() => {
    new Promise((resolve) => resolve(localStorage.getItem('playerId')))
      .then((retrievedPlayerId) => {
        if (retrievedPlayerId) {
          fetch(`/api/players/${retrievedPlayerId}`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((data: PlayerDTO) => {
              setPlayerState(data);
            });
        }
      })
      .finally(() => {
        setIsPlayerLoading(false);
      });
  }, []);

  const setPlayer = useCallback((player: PlayerDTO | null) => {
    setPlayerState(player);
    if (player) {
      localStorage.setItem('playerId', player.id);
    } else {
      localStorage.removeItem('playerId');
    }
  }, []);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {isPlayerLoading ? (
        <LoadingSpinner />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      )}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
