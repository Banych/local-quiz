'use client';

import React, { useCallback } from 'react';

import PlayerConfigureForm from '@/components/players/player-configure-form';
import { usePlayer } from '@/hooks/use-player';
import { useToast } from '@/hooks/use-toast';
import { PlayerConfigureFormType } from '@/components/players/player-configure-form.schema';
import { PlayerDTO } from '@/types/player.type';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PlayerProfile = () => {
  const { player, setPlayer } = usePlayer();
  const { toast } = useToast();
  const { push } = useRouter();

  const handleSubmit = useCallback(
    (data: PlayerConfigureFormType) => {
      if (!setPlayer || !player) {
        return;
      }

      fetch(`/api/players/${player.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          throw new Error((await res.json()).error);
        })
        .then((data: PlayerDTO) => {
          setPlayer(data);
        })
        .catch((error) => {
          toast({
            title: 'Error creating player',
            description: error.message,
            variant: 'destructive',
          });
        });
    },
    [player, setPlayer, toast]
  );

  const handleDeletePlayer = useCallback(() => {
    if (!setPlayer || !player) {
      return;
    }

    fetch(`/api/players/${player.id}`, {
      method: 'DELETE',
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error((await res.json()).error);
      })
      .then(() => {
        setPlayer(null);
        push('/');
      })
      .catch((error) => {
        toast({
          title: 'Error deleting player',
          description: error.message,
          variant: 'destructive',
        });
      });
  }, [player, push, setPlayer, toast]);

  if (!player) {
    return null;
  }

  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      <h1 className="text-4xl">Profile</h1>
      <PlayerConfigureForm onSubmit={handleSubmit} defaultValues={player} />

      <Button variant="destructive" onClick={handleDeletePlayer}>
        <Trash size={24} /> Delete player
      </Button>
    </div>
  );
};

export default PlayerProfile;
