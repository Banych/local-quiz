import { PlayerContext } from '@/components/providers/player-provider';
import { useContext } from 'react';

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
