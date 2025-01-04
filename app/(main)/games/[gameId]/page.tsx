import React from 'react';

type GameIdPageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

const GameIdPage: React.FC<GameIdPageProps> = async ({ params }) => {
  const { gameId } = await params;

  return <div>GameIdPage {gameId}</div>;
};

export default GameIdPage;
