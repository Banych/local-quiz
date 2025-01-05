import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePlayer } from '@/hooks/use-player';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

const PlayerInfo = () => {
  const { player } = usePlayer();
  const { push } = useRouter();

  const playerInitials = player?.name
    ? player.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : null;

  const createdAtFormatted = useMemo(() => {
    if (!player) {
      return null;
    }

    return formatDate(new Date(player.created_at), 'MMMM d, yyyy');
  }, [player]);

  const handleEditProfile = useCallback(() => {
    push('/profile');
  }, [push]);

  if (!player) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={player.avatar_url ?? undefined} />
          <AvatarFallback className="text-sm font-bold">
            {playerInitials}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div>{player.name}</div>
            <div className="text-sm text-gray-600">
              Since {createdAtFormatted}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleEditProfile}>
            Edit profile
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlayerInfo;
