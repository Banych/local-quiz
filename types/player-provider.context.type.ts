import { PlayerDTO } from '@/types/player.type';

export type PlayerProviderContextType = {
  player?: PlayerDTO | null;
  setPlayer?: (player: PlayerDTO | null) => void;
};
