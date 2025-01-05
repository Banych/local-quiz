'use client';

import React, { useCallback, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { SessionDTO } from '@/types/session.type';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import SmallLoader from '@/components/small-loader';

type GameSessionCardProps = {
  item: SessionDTO;
};

const GameSessionCard: React.FC<GameSessionCardProps> = ({ item }) => {
  const { push } = useRouter();
  const { toast } = useToast();

  const cardTitle = useMemo(() => {
    return item.name ?? `Game by ${item.created_by}`;
  }, [item.created_by, item.name]);

  const isDescriptionVisible = useMemo(() => {
    return !!item.name;
  }, [item.name]);

  const createdAtFormatted = useMemo(() => {
    return formatDistanceToNow(item.created_at);
  }, [item.created_at]);

  const isGameStarted = useMemo(() => {
    return !!item.started_at && new Date(item.started_at) < new Date();
  }, [item.started_at]);

  const handleClick = useCallback(() => {
    const userId = '1';
    fetch(`/api/games/${item.id}/join?userId=${userId}`, {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error((await response.json()).error);
        }
      })
      .then((data: SessionDTO) => {
        push(`/games/${data.id}`);
      })
      .catch((error) => {
        toast({
          title: 'Error joining game',
          description: error.message,
          variant: 'destructive',
        });
      });
  }, [item.id, push, toast]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {cardTitle} {isGameStarted && <SmallLoader />}
        </CardTitle>
        {isDescriptionVisible && (
          <CardDescription>Host: {item.created_by}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex grow flex-col gap-2">
        <div>{createdAtFormatted}</div>
        <div>{JSON.stringify(item.players_ids)}</div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" onClick={handleClick}>
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameSessionCard;
