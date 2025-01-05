'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';

import { usePlayer } from '@/hooks/use-player';
import PlayerConfigureForm from '@/components/players/player-configure-form';
import { PlayerConfigureFormType } from '@/components/players/player-configure-form.schema';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PlayerWelcome = () => {
  const { player, setPlayer } = usePlayer();
  const { toast } = useToast();

  const whatNextLinks = [
    {
      label: 'Browse games',
      href: '/games',
      description: 'Find a game to join',
    },
    {
      label: 'Create a game',
      href: '/games/new',
      description: 'Start a new game session',
    },
    {
      label: 'Take a look at the scoreboard',
      href: '/scoreboard',
      description: 'Check out the current leaderboard',
    },
  ];

  const handleFormSubmit = useCallback(
    (data: PlayerConfigureFormType) => {
      if (!setPlayer) {
        return;
      }

      fetch('/api/players', {
        method: 'POST',
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
        .then((data) => {
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
    [setPlayer, toast]
  );

  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      {!!player ? (
        <>
          <h2 className="text-4xl font-bold">Welcome, {player.name}!</h2>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl">What next?</h3>
            <div className="grid grid-cols-2 gap-4">
              {whatNextLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  <Card className="hover:cursor-pointer hover:shadow-slate-700">
                    <CardHeader>
                      <CardTitle>{link.label}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-bold">Welcome!</h2>
          <PlayerConfigureForm
            onSubmit={handleFormSubmit}
            formDescription="You don't have a player info yet. Please fill in the form below to get started."
          />
        </>
      )}
    </div>
  );
};

export default PlayerWelcome;
